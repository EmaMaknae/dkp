<template>
  <div class="hello">
    <h1 class="subtitle">Adicione sua marca</h1>
    <form @submit.prevent="adicionarMarca">
      <label element class="marca" for="novaMarca">Nova Marca:</label>
      <input  type="text" id="novaMarca" v-model="novaMarcaNome">
      <button type="submit">Adicionar Marca</button>
    </form>
    <h1 class="subtitle " >Adicionar Novo Produto:</h1>
    <form @submit.prevent="adicionarProduto">
      <label element class="produto" for="novoProduto">Novo Produto:</label>
      <input  type="text" id="novoProduto" v-model="novoProdutoNome">
      <label  element class="marca" for="marcaSelecionada">Marca:</label>
      <select v-model="marcaSelecionada">
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}</option>
      </select>
      <button type="submit">Adicionar Produto</button>
    </form>
    <h1 v-if="marcas.length" class="title">Lista de Marcas:</h1>
    <ul>
      <li v-for="marca in marcas" :key="marca.id" class="primeiraletramaiuscula">
        {{ marca.nome }}
      </li>
    </ul>

    <h1 v-if="produtos.length" class="title">Lista de Produtos:</h1>
    <ul>
      <li v-for="produto in produtos" :key="produto.id" class="primeiraletramaiuscula">
        {{ produto.nome_produto }} ({{ produto.nome_marca }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      marcas: [],
      produtos: [],
      novoProdutoNome: '',
      marcaSelecionada: null
    };
  },
  created() {
    this.carregarMarcas();
    this.carregarProdutos();
  },
  methods: {
    carregarMarcas() {
      axios.get('http://localhost:3000/marcas')
        .then(response => {
          this.marcas = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar marcas:', error);
        });
    },
    carregarProdutos() {
      axios.get('http://localhost:3000/produtos')
        .then(response => {
          this.produtos = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar produtos:', error);
        });
    },
    adicionarProduto() {
      if (this.novoProdutoNome && this.marcaSelecionada) {
        axios.post('http://localhost:3000/produtos', { nome: this.novoProdutoNome, marca_id: this.marcaSelecionada })
          .then(() => {
            alert('Produto adicionado com sucesso!');
            this.carregarProdutos();
          })
          .catch(error => {
            console.error('Erro ao adicionar produto:', error);
          });
      } else {
        alert('Por favor, preencha o nome do produto e selecione uma marca.');
      }
    },
    adicionarMarca() {
      if (this.novaMarcaNome) {
        axios.post('http://localhost:3000/marcas', { nome: this.novaMarcaNome })
          .then(() => {
            alert('Marca adicionada com sucesso!');
            this.carregarMarcas(); 
          }) 
          .catch(error => {
            console.error('Erro ao adicionar marca:', error);
          });
      } else {
        alert('Por favor, preencha o nome da marca');
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
input, select{
  padding: 8px;
  border: 1px solid #342B4B;
  border-radius: 4px;
}
button {
  padding: 8px;
  background-color: #FDBC2C;
  color: #342B4B;
  margin-left: 1rem;
  border: 2px dotted #FFF013;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #342B4B;
  color: #FDBC2C;
}
.title {
  color:#342B4B;

}
.primeiraletramaiuscula {
  text-transform: capitalize;
}
.subtitle {
  color: #342B4B;
}
.produto {
font-weight: bold;
color: #342B4B;
padding: 8px;
}
.marca {
  font-weight: bold;
  color: #342B4B;
  padding:8px;
}
</style>
