<template>
	<header class="bg-white">
		<nav class="navbar sticky-top container">
			<div
				class="d-flex align-items-center justify-content-between w-100 px-3"
			>
				<div class="navbar-brand">
					<h3 class="m-0 active-section">{{ activeSection }}</h3>
				</div>
				<div
					class="bg-dark rounded-circle p-1"
					style="width: 40px; height: 40px"
				>
					<img
						class="w-100 f-100"
						src="../assets/images/user.png"
						alt=""
					/>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
const props = defineProps({
	activeSection: {
		type: String,
		required: true,
	},
});
</script>

<style scoped>
header {
	position: sticky;
	top: 0;
	z-index: 2000;
}
.active-section {
	text-transform: capitalize !important;
}
</style>
