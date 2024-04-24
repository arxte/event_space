<template>
	<teleport
		to="body"
		v-if="modelValue"
	>
		<div class="modals">
			<div
				class="modals__wrapper"
				@click="() => toggleModal()"
			/>
			<form
				class="modals__box"
				ref="form"
				novalidate
				@submit.prevent
				:style="`max-width: ${width ? width : 500}px;`"
			>
				<div
					class="modals__head"
					v-if="title"
				>
					<h3 style="color: #fff">{{ title }}</h3>
					<!-- <div class="modals__head-xmark"> -->
					<img
						src="../public/assets/img/icons/xmark.svg"
            alt="xmark"
						@click="() => toggleModal()"
            style="cursor: pointer;"
					/>
					<!-- </div> -->
				</div>
				<div class="modals__body">
					<slot />
				</div>
				<div
					class="modals__footer"
					v-if="actions?.length"
				>
					<div
						class="modals__left"
						v-if="!!$slots?.footer"
					>
						<slot name="footer" />
					</div>
					<div class="modals__right">
						<button
							v-for="(item, index) in actions"
							:key="item + index"
							:isSubmit="item === submitBtn"
							@click="item === submitBtn ? submit() : ($emit(item as keyof typeof emit), toggleModal())"
							:isBlue="item === submitBtn"
							:is-disabled="(isError || isDisabled) && item === submitBtn"
						>
							{{ item }}
          </button>
					</div>
				</div>
			</form>
		</div>
	</teleport>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useMagicKeys } from '@vueuse/core';
const { escape } = useMagicKeys();

interface Props {
	title?: string;
	width?: string;
	modelValue?: boolean;
	isError?: boolean;
	actions?: Array<string>;
	submitBtn?: string;
	isDisabled?: boolean;
	manualDisableModal?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['submit', 'update:modelValue', 'ok', 'cancel']);

const form = ref();

const submit = () => {
	if (!form.value.checkValidity()) {
		return false;
	} else {
		if (props.actions?.length && props.submitBtn) {
			emit('submit');
			if (!props.manualDisableModal) emit('update:modelValue', false);
		}
	}
};

const toggleModal = () => {
	if (props.modelValue) {
		emit('update:modelValue', false);
	}
};

watchEffect(() => {
	if (escape.value) emit('update:modelValue', false);
});
</script>

<style scoped lang="scss">
.modals {
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 16px;
	padding: 0 1.5rem;

	&__wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		transition: 0.2s;
	}

	&__box {
		position: relative;
		min-height: 100px;
		background: #fff;
		box-shadow:
			0 12px 16px -4px rgba(16, 24, 40, 0.08),
			0px 4px 6px -2px rgba(16, 24, 40, 0.03);
		border-radius: 6px;
		width: 100%;
	}

	&__head {
		position: relative;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 50px;
		border-radius: 6px 6px 0 0;
		border-bottom: 1px solid #b5cedb;
		background: #fff;

		h3 {
			font-weight: 500;
			font-size: 20px;
			line-height: 30px;
		}

		i {
			transition: 0.2s;
			cursor: pointer;

			&:hover {
				background: #0000007c;
			}
		}
	}

	&__body {
		max-height: 80vh;
		padding: 40px 24px;
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 12px;

		::-webkit-scrollbar-thumb {
			border-inline: 8px solid white;
		}

		&:deep(.box) {
			margin-top: 0;
		}
	}

	&__items {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__footer {
		padding: 16px;
		border-radius: 0 0 6px 6px;
		border-top: 1px solid #b5cedb;
		background: #f4f7fa;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 16px;
	}

	&__left {
		flex: 1 1 auto;
	}

	&__right {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	&:deep(.default) {
		width: 100%;
	}
}
</style>
