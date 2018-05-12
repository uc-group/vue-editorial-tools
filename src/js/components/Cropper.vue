<template>
    <div v-once>
        <img :src="src" />
    </div>
</template>

<script>
    import Cropper from 'cropperjs';
    import _ from 'lodash';

    export default {
        props: ['src', 'options'],
        mounted() {
            this.cropper = new Cropper(this.$el.querySelector('img'), Object.assign({}, this.options, {
                ready: () => {
                    this.$emit('ready', this.cropper);
                },
                cropend: (event) => {
                    this.$emit('cropend', this.cropper, event)
                }
            }));
        },
        watch: {
            src(newSrc) {
                this.cropper.replace(newSrc);
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 100%;
    }
</style>
