<template>
  <div class="hello">
    <h2 class="subtitle " >Adicionar Novo Produto:</h2>
    <form @submit.prevent="adicionarProduto">
      <label element class="produto" for="novoProduto">Novo Produto:</label>
      <input  type="text" id="novoProduto" v-model="novoProdutoNome">
      <label  element class="marca" for="marcaSelecionada">Marca:</label>
      <select v-model="marcaSelecionada">
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}</option>
      </select>
      <button type="submit">Adicionar Produto</button>
    </form>
    <h1 class="title">Lista de Marcas:</h1>
    <ul>
      <li v-for="marca in marcas" :key="marca.id" >
        {{ marca.nome }}
      </li>
    </ul>

    <h1 class="title">Lista de Produtos:</h1>
    <ul>
      <li v-for="produto in produtos" :key="produto.id">
        {{ produto.nome }} ({{ produto.marca_nome }})
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
