<template>
    <div class="image-variations">
        <ul class="image-variations__presets tabs">
            <li :class="['tabs__tab', {'tabs__tab--active': preset === currentPreset}]" v-for="preset in selectedPresets" @click="currentPreset = preset">{{ preset.name }}</li>
            <li v-if="availablePresets.length" class="tabs__tab tabs__tab--new" @click="selectingPreset = true">
                <span>+</span>
                <div class="image-variations__available-presets" v-show="selectingPreset">
                    <ul class="list">
                        <li class="list__element" v-for="preset in availablePresets" @click.stop="selectNewPreset(preset)">{{ preset }} (+)</li>
                    </ul>
                    <button type="button" @click.stop="selectingPreset = false">Cancel</button>
                </div>
            </li>
        </ul>
        <div class="panel">
            <uc-cropper v-if="ready" :src="image" :options="cropperOptions" @ready="cropperReady" @cropend="updatePreset"></uc-cropper>
        </div>
        <span v-if="currentPreset">{{ currentPreset.crop }}</span>
        <button @click="save">Save</button>
    </div>
</template>

<script>
    import Cropper from './Cropper';

    function emptyPreset() {
        return [{
            name: 'default',
            aspectRatio: null,
            crop: null
        }];
    }

    export default {
        components: {
            'uc-cropper': Cropper
        },
        props: ['image', 'presets'],
        data() {
            return {
                ready: false,
                selectingPreset: false,
                selectedPresets: emptyPreset(),
                currentPreset: null,
                cropperOptions: {
                    viewMode: 1,
                    zoomOnWheel: false,
                    autoCrop: false
                }
            }
        },
        computed: {
            availablePresets() {
                if (!this.presets) {
                    return [];
                }

                const selectedPresets = [];
                this.selectedPresets.forEach((preset) => selectedPresets.push(preset.name));
                return Object.keys(this.presets).filter((preset) => {
                    return selectedPresets.indexOf(preset) === -1;
                });
            }
        },
        mounted() {
            this.ready = true;
        },
        methods: {
            cropperReady(cropper) {
                this.cropper = cropper;
                this.currentPreset = this.selectedPresets[0];
                this.updatePreset(cropper);
            },
            updatePreset(cropper) {
                if (this.currentPreset) {
                    this.currentPreset.crop = cropper.getData();
                }
            },
            selectNewPreset(preset) {
                const newPreset = {
                    name: preset,
                    aspectRatio: this.presets[preset],
                    crop: null
                };
                this.selectedPresets.push(newPreset);
                this.currentPreset = newPreset;
                this.cropper.clear();
                this.selectingPreset = false;
            },
            save() {
                const data = {};
                this.selectedPresets.forEach((preset) => {
                    if (preset.crop.width !== 0 && preset.crop.height !== 0) {
                        data[preset.name] = {
                            x: Math.round(preset.crop.x),
                            y: Math.round(preset.crop.y),
                            width: Math.round(preset.crop.width),
                            height: Math.round(preset.crop.height)
                        }
                    }
                });

                this.$emit('save', data);
            }
        },
        watch: {
            currentPreset(preset) {
                this.cropper.setAspectRatio(preset.aspectRatio);
                if (preset.crop) {
                    if (preset.crop.width === 0 || preset.crop.height === 0) {
                        this.cropper.clear();
                    } else {
                        this.cropper.crop();
                        this.cropper.setData(preset.crop);
                    }
                }
            },
            image(newImage) {
                this.selectedPresets = emptyPreset();
            }
        }
    }
</script>
