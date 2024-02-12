<template>
  <div class="hello">
    <h1>Lista de Marcas:</h1>
    <ul>
      <li v-for="marca in marcas" :key="marca.id">
        {{ marca.nome }}
      </li>
    </ul>

    <h1>Lista de Produtos:</h1>
    <ul>
      <li v-for="produto in produtos" :key="produto.id">
        {{ produto.nome }} ({{ produto.marca_nome }})
      </li>
    </ul>

    <h2>Adicionar Novo Produto:</h2>
    <form @submit.prevent="adicionarProduto">
      <label for="novoProduto">Novo Produto:</label>
      <input type="text" id="novoProduto" v-model="novoProdutoNome">
      <label for="marcaSelecionada">Marca:</label>
      <select v-model="marcaSelecionada">
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}</option>
      </select>
      <button type="submit">Adicionar Produto</button>
    </form>
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
</style>
