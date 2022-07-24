<template>
    <div v-if="loading" class="loading-wrap">
        <div class="loading-container">
            <div class="loading"></div>
        </div>
    </div>
</template>

<script>
export default {
	data() {
        return {
            loading: false,
        }
    },
	methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        },
	}
}
</script>
