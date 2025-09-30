<template>
    <main 
        class="columns is-gapless is-multiline"
        :class="{'modo-escuro': modoEscuroAtivado}"
    >
        <div class="column is-one-quarter">
            <BarraLateral @ao-tema-alterado="alterarTema"/>
        </div>
        <div class="column is-three-quarter conteudo">
            <Notificacoes />
            <RouterView />
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
        modoEscuroAtivado: false
    }
  },
  methods: {
    alterarTema(modoEscuroAtivado: boolean): void {
        this.modoEscuroAtivado = modoEscuroAtivado
    }
  },
  components: {
    BarraLateral,
    Notificacoes
  }
});
</script>

<style scoped>
main {
    --bg-primario: #FFF;
    --texto-primario: #000;
}

main.modo-escuro {
    --bg-primario: #2B2B42;
    --texto-primario: #FFF;
}

.conteudo {
    background-color: var(--bg-primario);
}
</style>
