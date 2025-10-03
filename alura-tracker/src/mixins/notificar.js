import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { store } from "@/store";
export const notificacaoMixin = {
    methods: {
        notificar(tipo, titulo, texto) {
            store.commit(NOTIFICAR, { titulo, texto, tipo });
        }
    }
};
//# sourceMappingURL=notificar.js.map