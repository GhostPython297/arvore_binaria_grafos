// === dá pra rodar isso com "node arvore.js"

// 1. ESTRUTURA BÁSICA DE ÁRVORE BINÁRIA
class NoArvore {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

class ArvoreBinaria {
    constructor() {
        this.raiz = null;
    }
    
    // Método auxiliar para inserir valores (para criar árvore de exemplo)
    inserir(valor) {
        this.raiz = this._inserirRecursivo(this.raiz, valor);
    }
    
    // hoisting pq sim
    _inserirRecursivo(no, valor) {

        // isso poderia ser um switch case
        // ia ficar menos feio
        // não teve a veriricação de se o valor foi igual ao valor
        // do nó
        if (no === null) {
            return new NoArvore(valor);
        }
        
        if (valor < no.valor) {
            no.esquerda = this._inserirRecursivo(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this._inserirRecursivo(no.direita, valor);
        }
        
        return no;
    }
}

// 2. ALGORITMO DFS PRÉ-ORDEM
// recebe uma array, que na verdade é um objeto
// mas chamamos de array pq sim
function dfsPreOrdem(no, resultado = []) {
    // Caso base: se o nó é null, retorna
    // usando estritamente igual na condicional para
    // garantir que essa benção não dê problema
    if (no === null) {
        return resultado;
    }
    
    // 1. Processa o nó atual (visita)
    resultado.push(no.valor);
    console.log(`Visitando nó: ${no.valor}`);
    
    // 2. Percorre subárvore esquerda
    dfsPreOrdem(no.esquerda, resultado);
    
    // 3. Percorre subárvore direita
    dfsPreOrdem(no.direita, resultado);
    
    // conforme o valor vai sendo processado nas linhas
    // anteriores, ele muda, então esse retorno é
    // diferente do retorno que está dentro do if
    // por mais estranho que isso pareça
    return resultado;
}

// Versão iterativa do DFS pré-ordem usando pilha
function dfsPreOrdemIterativo(raiz) {
    // eu chamo esse retorno de objeto vazio do tipo array
    // não sei se é o correto
    if (raiz === null) return [];
    
    const resultado = [];
    const pilha = [raiz];
    
    while (pilha.length > 0) {
        const no = pilha.pop();
        resultado.push(no.valor);
        
        // Adiciona primeiro o filho direito, depois o esquerdo
        // (pois a pilha é LIFO - Last In First Out)
        if (no.direita !== null) {
            pilha.push(no.direita);
        }
        if (no.esquerda !== null) {
            pilha.push(no.esquerda);
        }
    }
    
    return resultado;
}

// 3. VERIFICAR SE UM VALOR EXISTS NA ÁRVORE USANDO DFS
function buscarValorDFS(no, valorProcurado) {
    // Caso base: nó é null
    if (no === null) {
        return false;
    }
    
    // Encontrou o valor
    if (no.valor === valorProcurado) {
        console.log(`Valor ${valorProcurado} encontrado!`);
        return true;
    }
    
    // Busca recursivamente nas subárvores
    return buscarValorDFS(no.esquerda, valorProcurado) || 
           buscarValorDFS(no.direita, valorProcurado);
}

// Versão otimizada para árvore binária de busca
function buscarValorBST(no, valorProcurado) {
    if (no === null) {
        return false;
    }
    
    if (no.valor === valorProcurado) {
        return true;
    }
    
    // Em uma BST, podemos otimizar a busca
    if (valorProcurado < no.valor) {
        return buscarValorBST(no.esquerda, valorProcurado);
    } else {
        return buscarValorBST(no.direita, valorProcurado);
    }
}

// 4. CALCULAR ALTURA DA ÁRVORE USANDO DFS
function calcularAltura(no) {
    // Caso base: nó é null
    if (no === null) {
        return -1; // Ou 0, dependendo da convenção
    }
    
    // Calcula altura das subárvores recursivamente
    const alturaEsquerda = calcularAltura(no.esquerda);
    const alturaDireita = calcularAltura(no.direita);
    
    // Altura = 1 + maior altura entre as subárvores
    const alturaAtual = 1 + Math.max(alturaEsquerda, alturaDireita);
    
    console.log(`Nó ${no.valor} - Altura: ${alturaAtual}`);
    return alturaAtual;
}

// 5. CONTAR NÚMERO DE NÓS NA ÁRVORE
function contarNos(no) {
    // Caso base: nó é null
    if (no === null) {
        return 0;
    }
    
    // Conta o nó atual (1) + nós da subárvore esquerda + nós da subárvore direita
    const totalNos = 1 + contarNos(no.esquerda) + contarNos(no.direita);
    
    console.log(`Nó ${no.valor} - Total de nós na subárvore: ${totalNos}`);
    return totalNos;
}

// 6. VERIFICAR SE ÁRVORE É SIMÉTRICA
function ehSimetrica(raiz) {
    if (raiz === null) {
        return true;
    }
    
    return verificarSimetria(raiz.esquerda, raiz.direita);
}

function verificarSimetria(noEsquerdo, noDireito) {
    // Ambos são null - simétrico
    if (noEsquerdo === null && noDireito === null) {
        return true;
    }
    
    // Apenas um é null - não simétrico
    if (noEsquerdo === null || noDireito === null) {
        return false;
    }
    
    // Valores diferentes - não simétrico
    if (noEsquerdo.valor !== noDireito.valor) {
        return false;
    }
    
    // Verifica simetria cruzada:
    // esquerda do nó esquerdo com direita do nó direito
    // direita do nó esquerdo com esquerda do nó direito
    return verificarSimetria(noEsquerdo.esquerda, noDireito.direita) &&
           verificarSimetria(noEsquerdo.direita, noDireito.esquerda);
}

// 7. ENCONTRAR VALOR MÍNIMO EM BST USANDO DFS
function encontrarMinimoBST(no) {
    // Em uma BST, o mínimo está sempre à esquerda
    if (no === null) {
        return null;
    }
    
    // Se não há nó à esquerda, este é o mínimo
    if (no.esquerda === null) {
        console.log(`Valor mínimo encontrado: ${no.valor}`);
        return no.valor;
    }
    
    // Continua buscando à esquerda
    return encontrarMinimoBST(no.esquerda);
}

// Versão para árvore binária comum (não necessariamente BST)
function encontrarMinimoArvoreComum(no) {
    if (no === null) {
        return Infinity; // Valor alto para comparação
    }
    
    const valorAtual = no.valor;
    const minimoEsquerda = encontrarMinimoArvoreComum(no.esquerda);
    const minimoDireita = encontrarMinimoArvoreComum(no.direita);
    
    return Math.min(valorAtual, minimoEsquerda, minimoDireita);
}

// ========== EXEMPLOS DE USO ==========

console.log("=== CRIANDO ÁRVORE DE EXEMPLO ===");
const arvore = new ArvoreBinaria();
// Inserindo valores: 50, 30, 70, 20, 40, 60, 80
[50, 30, 70, 20, 40, 60, 80].forEach(valor => arvore.inserir(valor));

console.log("\n=== 1. ESTRUTURA CRIADA ===");
console.log("Árvore BST criada com valores: 50, 30, 70, 20, 40, 60, 80");

console.log("\n=== 2. DFS PRÉ-ORDEM RECURSIVO ===");
const resultadoPreOrdem = dfsPreOrdem(arvore.raiz);
console.log("Resultado pré-ordem:", resultadoPreOrdem);

console.log("\n=== 2b. DFS PRÉ-ORDEM ITERATIVO ===");
const resultadoIterativo = dfsPreOrdemIterativo(arvore.raiz);
console.log("Resultado iterativo:", resultadoIterativo);

console.log("\n=== 3. BUSCAR VALORES ===");
console.log("Buscando 40:", buscarValorDFS(arvore.raiz, 40));
console.log("Buscando 90:", buscarValorDFS(arvore.raiz, 90));

console.log("\n=== 4. CALCULAR ALTURA ===");
const altura = calcularAltura(arvore.raiz);
console.log("Altura da árvore:", altura);

console.log("\n=== 5. CONTAR NÓS ===");
const totalNos = contarNos(arvore.raiz);
console.log("Total de nós:", totalNos);

console.log("\n=== 6. VERIFICAR SIMETRIA ===");
// Criando uma árvore simétrica para teste
const raizSimetrica = new NoArvore(1);
raizSimetrica.esquerda = new NoArvore(2);
raizSimetrica.direita = new NoArvore(2);
raizSimetrica.esquerda.esquerda = new NoArvore(3);
raizSimetrica.esquerda.direita = new NoArvore(4);
raizSimetrica.direita.esquerda = new NoArvore(4);
raizSimetrica.direita.direita = new NoArvore(3);

console.log("Árvore BST é simétrica?", ehSimetrica(arvore.raiz));
console.log("Árvore simétrica é simétrica?", ehSimetrica(raizSimetrica));

console.log("\n=== 7. ENCONTRAR MÍNIMO ===");
const minimo = encontrarMinimoBST(arvore.raiz);
console.log("Valor mínimo na BST:", minimo);