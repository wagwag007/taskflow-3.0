import Axios from 'axios';

function TasteAxios() {
  async function exemplo() {
    try {
      const resposta = await Axios.get('https://jsonplaceholder.typicode.com/posts');

      console.log('response', resposta);
      console.log('Response data', resposta.data);
      console.log('Response title', resposta.data[0]?.title); // Pega o título do primeiro item
      console.log('Response status', resposta.status);
    } catch (error) {
      console.log('Error message', error.message);
    }
  }

  return (
    <div>
      <button onClick={exemplo}>Executar Requisição</button>
    </div>
  );
}

export default TasteAxios;