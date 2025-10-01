<template>
    <Formulario @ao-salvar-tarefa="salvarTarefa"/>
    <div class="lista">
        <Tarefa 
            v-for="(tarefa, index) in tarefas" 
            :key="index"
            :tarefa="tarefa"
            @ao-tarefa-clicada="selecionarTarefa"
        />
        <Box v-if="!existemTarefa">
            Nenhuma tarefa adicionada.
        </Box>
        <div 
            v-if="tarefaSelecionada != null"
            class="modal"
            :class="{'is-active': tarefaSelecionada}"
        >
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">
                        Modal title
                    </p>
                    <button 
                        class="delete" 
                        aria-label="close"
                        @click="fecharModal"
                    />
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input 
                            v-model="tarefaSelecionada.descricao"
                            type="text" 
                            class="input"
                            id="descricaoDaTarefa"
                        >
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success">
                        Save changes
                    </button>
                    <button 
                        class="button"
                        @click="fecharModal"
                    >
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Formulario from '@/components/Formulario.vue';
import Tarefa from '@/components/Tarefa.vue';
import Box from '@/components/Box.vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import { CADASTRAR_TAREFA, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  data() {
    return {
        tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa): void {
        this.tarefaSelecionada = tarefa
    },
    fecharModal(): void {
        this.tarefaSelecionada = null
    }
  },
  computed: {
    existemTarefa(): boolean {
        return !(this.tarefas.length === 0)
    }
  },
  components: {
    Formulario,
    Tarefa,
    Box
  },
  setup() {
    const store = useStore(key)
    store.dispatch(OBTER_TAREFAS)

    return {
        tarefas: computed(() => store.state.tarefas),
        store
    }
  }
});
</script>

<style scoped>
.lista {
    padding: 1.25rem;
}
</style>
