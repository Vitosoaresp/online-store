import React from 'react';
import PropTypes from 'prop-types';
import styles from '../modules/Checkout.module.css';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      endereço: '',
      complemento: '',
      numero: '',
      cidade: '',
      estado: '',
      sumCart: 0,
    };
  }

  componentDidMount() {
    this.sumCart();
  }

  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  sumCart = () => {
    const { cartList } = this.props;
    const sum = cartList.reduce((acc, item) => (acc + (item.price * item.quantity)), 0)
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    this.setState({ sumCart: sum });
  }

  comprar = (e) => {
    const { history } = this.props;
    e.preventDefault();
    history.push('/');
  }

  render() {
    const {
      name,
      cpf,
      email,
      telefone,
      cep,
      endereço,
      complemento,
      numero,
      cidade,
      estado,
      sumCart } = this.state;
    const { cartList } = this.props;
    return (
      <div className={ styles.container }>
        <div className={ styles.revisao }>
          <h3>Revise seus Produtos</h3>
          <div className={ styles.produtos }>
            {cartList.map((item, index) => (
              <div key={ index } className={ styles.produtosItems }>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{`Quantidade: ${item.quantity}`}</p>
                <p>
                  {`${item.price
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} `}
                </p>
              </div>
            ))}
            <p className={ styles.total }>
              {`Total: ${sumCart}`}
            </p>
          </div>
        </div>
        <form className={ styles.form }>
          <h3>Informações do Comprador</h3>
          <input
            type="text"
            name="name"
            data-testid="checkout-fullname"
            value={ name }
            placeholder="Nome Completo"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
            value={ cpf }
            placeholder="CPF"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="email"
            name="email"
            data-testid="checkout-email"
            value={ email }
            placeholder="Email"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="text"
            name="telefone"
            data-testid="checkout-phone"
            value={ telefone }
            placeholder="Telefone"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="text"
            name="cep"
            data-testid="checkout-cep"
            value={ cep }
            placeholder="CEP"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="text"
            name="endereço"
            value={ endereço }
            data-testid="checkout-address"
            placeholder="Endereço"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="text"
            name="complemento"
            value={ complemento }
            placeholder="Complemento"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="text"
            name="numero"
            value={ numero }
            placeholder="Número"
            onChange={ (e) => this.handleForm(e) }
          />
          <input
            type="text"
            name="cidade"
            value={ cidade }
            placeholder="Cidade"
            onChange={ (e) => this.handleForm(e) }
          />
          <select
            id="estado"
            name="estado"
            value={ estado }
            onChange={ (e) => this.handleForm(e) }
          >
            <option value="Acre">Acre</option>
            <option value="Alagoas">Alagoas</option>
            <option value="Amapá">Amapá</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Bahia">Bahia</option>
            <option value="Ceará">Ceará</option>
            <option value="Distrito">Distrito Federal</option>
            <option value="Espírito Santo">Espírito Santo</option>
            <option value="Goiás">Goiás</option>
            <option value="Maranhão">Maranhão</option>
            <option value="Mato Grosso">Mato Grosso</option>
            <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
            <option value="Minas Gerais">Minas Gerais</option>
            <option value="Pará">Pará</option>
            <option value="Paraíba">Paraíba</option>
            <option value="Paraná">Paraná</option>
            <option value="Pernambuco">Pernambuco</option>
            <option value="Piauí">Piauí</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Rio Grande do Norte">Rio Grande do Norte</option>
            <option value="Rio Grande do Sul">Rio Grande do Sul</option>
            <option value="Rondônia">Rondônia</option>
            <option value="Roraima">Roraima</option>
            <option value="Santa Catarina">Santa Catarina</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Sergipe">Sergipe</option>
            <option value="Tocantins">Tocantins</option>
            <option value="Estrangeiro">Estrangeiro</option>
          </select>
        </form>
        <div className={ styles.pagamento }>
          <h3>Metodo de Pagamento</h3>
          <div>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                id="boleto"
                value="1"
                name="rating"
              />
            </label>
            <label htmlFor="pix">
              Pix
              <input
                type="radio"
                id="pix"
                value="2"
                name="rating"
              />
            </label>
            <label htmlFor="cc">
              Cartão Credito
              <input
                type="radio"
                id="cc"
                value="3"
                name="rating"
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          className={ styles.button }
          onClick={ (e) => this.comprar(e) }
        >
          COMPRAR
        </button>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
