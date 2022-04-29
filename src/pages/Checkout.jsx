import React from 'react';
import PropTypes from 'prop-types';

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
    const sum = cartList.reduce((acc, item) => (acc + item.price), 0);
    const newSum = sum.toFixed(2);
    this.setState({ sumCart: newSum });
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
      <div>
        <div>
          <h3>Revise seus Produtos</h3>
          <div>
            {cartList.map((item, index) => (
              <div key={ index }>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{`Produto ${index + 1}`}</p>
                <p>{`R$${item.price} `}</p>
              </div>
            ))}
            <p>
              {`Total: R$${sumCart}`}
            </p>
          </div>
        </div>
        <form>
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
            placeholder="Emai"
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
          <select id="estado" name="estado" value={ estado }>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
            <option value="EX">Estrangeiro</option>
          </select>
        </form>
        <div>
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
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Checkout;
