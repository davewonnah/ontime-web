<template>
	<div
		class="table-responsive container p-0 d-flex flex-column"
		style="gap: 0.9rem"
	>
		<div class="row justify-content-between container p-0 mx-auto">
			<Search v-model:search="searchTerms" />
			<Sort v-model:direction="directionTerm" />
		</div>

		<table class="table table-sm table-hover has-checkbox">
			<thead>
				<tr>
					<th scope="col">
						<div class="form-check mb-0">
							<input
								class="form-check-input"
								type="checkbox"
								id="selectAll"
								@change="selectAll"
								:checked="allSelected"
							/>
							<label class="form-check-label" for="customCheck">
								<span class="visually-hidden">Select all</span>
							</label>
						</div>
					</th>
					<th scope="col">First name</th>
					<th scope="col">Middle name</th>
					<th scope="col">Last name</th>
					<th scope="col">Contact</th>
					<th scope="col">Email</th>
					<th scope="col">Created At</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="visitor in visitors"
					:key="visitor.id"
					@click="visitorDetail(visitor.id)"
				>
					<td>
						<div class="form-check mb-0">
							<input
								class="form-check-input"
								type="checkbox"
								:id="`checkbox-${visitor.id}`"
								v-model="visitor.selected"
							/>
						</div>
					</td>
					<td>{{ visitor.first_name }}</td>
					<td>{{ visitor.middle_name }}</td>
					<td>{{ visitor.last_name }}</td>
					<td>{{ visitor.msisdn }}</td>
					<td>{{ visitor.email }}</td>
					<td>{{ visitor.created_at }}</td>
				</tr>
			</tbody>
		</table>
		<div
			id="spinner"
			v-if="loader"
			class="d-flex justify-content-center p-4"
		>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div v-if="fetchError" class="invalid-feedback show-feedback m-auto">
			{{ errorMessage }}
		</div>
	</div>

	<Pagination v-model="start" />
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { getVisitors } from "@/assets/js/index.js";
import Pagination from "../Pagination.vue";
import Search from "../Search.vue";
import Sort from "../Sort.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const visitors = ref([]);
const start = ref(0);
const limit = ref(10);
const loader = ref(true);

const searchTerms = ref("");

const refresh = defineModel("refresh");
const fetchError = ref(false);
const errorMessage = ref("Error Loading Visits, Try Again!");

watch(
	() => refresh.value,
	async () => {
		visitors.value = [];
		loader.value = true;
		await fetchVisitors();
		refresh.value = false;
	}
);

const sortTerm = defineModel("term");
sortTerm.value = "created_at";

const directionTerm = defineModel("direction");
directionTerm.value = "desc";

watch(
	() => [searchTerms.value, sortTerm.value, directionTerm.value, start.value],
	async ([searchValue, sortValue, directionValue, startValue]) => {
		const data = await getVisitors({
			start: startValue,
			search: searchValue,
			sort: sortValue,
			direction: directionValue,
			limit: limit.value,
		});

		if (!data.length) {
			console.log(start.value);
			console.log({ data });
		}
		visitors.value = formatDateTime(data);
	}
);

const visitorDetail = (id) => {
	router.push({ name: "visitorDetail", params: { id } });
};

const fetchVisitors = async () => {
	try {
		const data = await getVisitors({
			sort: sortTerm.value,
			direction: directionTerm.value,
			limit: limit.value,
		});
		visitors.value = formatDateTime(data);
		loader.value = false;
	} catch (error) {
		loader.value = false;
		fetchError.value = true;
	}
};

const formatDateTime = (visitors) => {
	return visitors.map((visitor) => {
		const [date] = visitor.created_at.split("T");
		visitor.created_at = date;
		return { ...visitor, seleted: false };
	});
};

onMounted(() => {
	fetchVisitors();
});

const allSelected = computed({
	get() {
		return (
			visitors.value.length > 0 &&
			visitors.value.every((visit) => visit.selected)
		);
	},
	set(value) {
		visitors.value.forEach((visit) => {
			visit.selected = value;
		});
	},
});

const selectAll = (event) => {
	allSelected.value = event.target.checked;
};
</script>

<style scoped>
.show-feedback {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: larger;
	padding: 4rem;
}
table {
	margin: 0;
}

tr {
	cursor: pointer;
}

th,
td {
	padding: 0.9rem;
	font-size: 0.9rem;
}

@media (min-width: 768px) and (max-width: 1440px) {
	th,
	td {
		padding: 0.7rem;
	}
}

svg.solaris-icon {
	width: 1.2rem;
	height: 1.2rem;
}
</style>
