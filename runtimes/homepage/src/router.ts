import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "./components/HomeLayout.vue";
import DocumentLayout from "./components/DocumentLayout.vue";
import HomePage from "./views/HomePage.vue";
import DownloadPage from "./views/DownloadPage.vue";
import DocumentPage from "./views/DocumentPage.vue";
import NotFoundPage from "./views/NotFoundPage.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: HomeLayout,
			children: [
				{
					path: "",
					name: "home",
					component: HomePage,
				},
				{
					path: "download",
					name: "download",
					component: DownloadPage,
				},
			],
		},
		{
			path: "/document",
			component: DocumentLayout,
			children: [
				{
					path: "",
					name: "docs",
					component: DocumentPage,
				},
				{
					path: ":pathMatch(.*)*",
					component: DocumentPage,
				},
			],
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: NotFoundPage,
		},
	],
});

export default router;
