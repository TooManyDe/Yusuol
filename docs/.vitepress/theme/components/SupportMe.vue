<template>
	<t-card :style="{ maxWidth: '520px', margin: 'auto', marginTop: '20px', paddingBottom: '10px' }">
		<h3 align="center" style="border: 0; margin: 10px 0 0;">Cyber Begging</h3>
		<div class="card-container">
			<t-card theme="poster2" :class="'payment-card'">
				<template #cover>
					<div class="img-container">
						<img :src="weiXinPayUrl" alt="WeChat Pay QR Code" />
					</div>
				</template>
				<template #footer>
					<div align="center">
						{{ isEN ? "WeChat Pay" : "微信支付" }}
					</div></template
				>
			</t-card>
			<t-card theme="poster2" :class="'payment-card'">
				<template #cover>
					<div class="img-container">
						<img :src="zhiFuBaoPayUrl" alt="Alipay QR Code" />
					</div>
				</template>
				<template #footer>
					<div align="center">{{ isEN ? "Alipay" : "支付宝支付" }}</div>
				</template>
			</t-card>
			</div>
		</t-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vitepress";

const route = useRoute();
const isEN = computed(() => route.path.startsWith("/en"));

const weiXinPayUrl = "https://cdn.ddbx.org/03.jpg";
const zhiFuBaoPayUrl =
	"https://cdn.ddbx.org/04.jpg";

</script>
<style lang="scss" scoped>
.card-container {
	display: flex;
	justify-content: space-between;
	margin: 25px 0 20px;
	flex-wrap: wrap;
	gap: 20px;
}

.payment-card {
	width: 200px;
	flex-grow: 1;
	min-width: 150px;
}

.img-container {
	height: 198px;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-radius: 6px;
}

.img-container img {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
}


.mt-10 {
	margin-top: 10px;
}

.no-underline {
	&:hover {
		text-decoration: none !important;
	}
}

.hollow-text {
	/* 设置文本颜色为透明 */
	color: var(--vp-c-bg);

	-webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>
