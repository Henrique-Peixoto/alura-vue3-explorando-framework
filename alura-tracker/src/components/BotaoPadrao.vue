<template>
    <button 
        class="button"
        :disabled="desabilitado"
    >
        <span class="icon">
            <i :class="icone" />
        </span>
        <span>
            {{ texto }}
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoPadrao',
    props: {
        texto: {
            type: String,
            required: true
        },
        icone: {
            type: String,
            required: true
        },
        desabilitado: {
            type: Boolean,
            default: false
        }
    }
})
</script>
