<template>
    <ow-grid
        :items-source="data"
        :initialized="initialized"
        headersVisibility="None"
        selectionMode="None"
        :header="false"
        :footer="false"
        :key="data"
    >
        <wj-flex-grid-column binding="title" width="*" />
        <wj-flex-grid-column binding="total" align="center" :width="100" cssClass="progress-cell">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                <template v-if="cell.item?.total && cell.item?.total !== null">
                    <div class="progress">
                        <div
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="4"
                            aria-valuenow="1"
                            class="progress-bar"
                            :style="`width: ${cellItemProgress(cell)}%`"
                        />
                    </div>
                </template>
            </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column binding="total" align="center" :width="36">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                <template v-if="cell.item?.total && cell.item?.total !== null">
                    {{ `${cell.item.complete}/${cell.item.total}` }}
                </template>
            </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
    </ow-grid>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import * as wijmo from '@grapecity/wijmo';

export default {
    props: {
        transportData: {
            type: Object,
            default: '',
        },
    },
    setup(props) {
        const state = reactive({
            data: props.transportData,
            grid: '',
        });

        const cellItemProgress = (cell) => {
            let total = cell.item.total;
            let complete = cell.item.complete;
            if (total && complete) {
                return (complete / total) * 100;
            }
        };

        const initialized = (grid) => {
            state.grid = grid;
        };

        const animate = () => {
            wijmo.animate((val) => {
                // calculate transform for given percent (zero to one)
                let xform = '';
                if (val < 1) {
                    if (val > 0.03) val = val - 1;
                    xform = 'translateX( ' + -(val * 10) + 'px)';
                }
                // apply the transform to the grid element
                state.grid.hostElement.style.transform = xform;
            }, 200); // animate for two seconds
        };

        watch(
            () => props.transportData,
            (newData) => {
                state.data = newData;
            }
        );

        return {
            ...toRefs(state),
            cellItemProgress,
            initialized,
            animate,
        };
    },
};
</script>
