<template>
  <div style="display: flex; justify-content: space-between;">
        <div v-if="application.options.navigation" style="width: 20%; height: 100%; display: flex; justify-content: center; flex-direction: column;">
            <div style="width: 100%;">
                SSD_1
            <div style="margin-left: 15px; display: flex; align-items: center; height: 50px; flex-direction: column;">
                <div style="width: 100%;">
                idos
                </div>
                <div style="width: 100%;">
                indigenes
                </div>
            </div>
            </div>
            <div style="width: 100%;">
            SSD_2
            <div style="margin-left: 15px; display: flex; align-items: center; height: 50px; flex-direction: column;">
                <div style="width: 100%;">
                idos
                </div>
                <div style="width: 100%;">
                indigenes
                </div>
            </div>
            </div>
            <div style="width: 100%;">
            HDD_1
            </div>
            <div style="margin-left: 15px; display: flex; align-items: center; height: 50px; flex-direction: column;">
            <div style="width: 100%;">
                idos
                </div>
                <div style="width: 100%;">
                indigenes
                </div>
            </div>
        </div>
        <div v-if="application.options.navigation" style="width: 75%; height: 100%; display: flex; justify-content: center; position: relative; top: 0px; left: 0px; height: 450px; background-color: rgb(245, 245, 245);">
            {{ application.options.content }}
        </div>
        <div v-if="!application.options.navigation" style="width: 100%; height: 100%; display: flex; justify-content: center; position: relative; top: 0px; left: 0px; height: 450px; background-color: rgb(245, 245, 245);">
            {{ application.options.content }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Slope',
    props: [
        "application"
    ]
}
</script>