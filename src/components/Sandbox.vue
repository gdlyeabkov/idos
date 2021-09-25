<template>
  <div class="sandbox">
    <div class="sandboxHeader">
        <div class="sandboxTitle">
            <p>{{ title }}</p>
        </div>
        <div class="sandboxHeaderBtns">
            <span class="material-icons">
                horizontal_rule
            </span>
            <span class="material-icons">
                crop_7_5
            </span>
            <span style="color: rgb(175, 0, 0);" class="material-icons">
                disabled_by_default
            </span>
        </div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        <div v-if="navigation" style="width: 20%; height: 100%; display: flex; justify-content: center; flex-direction: column;">
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
        <div v-if="navigation" style="width: 75%; height: 100%; display: flex; justify-content: center; position: relative; top: 0px; left: 0px; height: 450px; background-color: rgb(245, 245, 245);">
            {{ content }}
        </div>
        <div v-if="!navigation" style="width: 100%; height: 100%; display: flex; justify-content: center; position: relative; top: 0px; left: 0px; height: 450px; background-color: rgb(245, 245, 245);">
            {{ content }}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Sandbox',
    props: [ 
        "title",
        "content",
        "navigation"
    ]
}
</script>

<style>

</style>