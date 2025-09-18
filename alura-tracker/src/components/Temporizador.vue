<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempo-em-segundos="tempoEmSegundos" />
        <BotaoPadrao 
            texto="play"
            icone="fas fa-play"
            :desabilitado="cronometroExecutando"
            @click="iniciar"
        />
        <BotaoPadrao 
            texto="stop"
            icone="fas fa-stop"
            :desabilitado="!cronometroExecutando"
            @click="finalizar"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from '@/components/Cronometro.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue';

export default defineComponent({
    // eslint-disable-next-line
    name: 'Temporizador',
    emits: [
        'aoTemporizadorFinalizado'
    ],
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroExecutando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroExecutando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000);
        },
        finalizar() {
            this.cronometroExecutando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    },
    components: {
        Cronometro,
        BotaoPadrao
    }
})
</script>
