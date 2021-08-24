import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import {store} from '../store/index';
import  DogCreate  from './DogCreate';
import {BrowserRouter} from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<DogCreate />',() => {
  
  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
    wrapper = mount(
    <Provider store ={store}>
      <BrowserRouter>
          <DogCreate />
      </BrowserRouter>
    </Provider>
    );
    })

    it('deberia renderizar un "h1" que contenga el texto "Creá tu nuevo Perrito!"', () => {
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('h1').at(0).text()).toEqual('Creá tu nuevo Perrito!');
      });

    it('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })

    it('Renderiza un label con el texto igual a "Nombre *"', () => {
          expect(wrapper.find('label').at(0).text()).toEqual('Nombre *');
    })

    it('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Selecciona al menos 3 Temperamentos: *"', () => {
         expect(wrapper.find('label').at(1).text()).toEqual('Selecciona al menos 3 Temperamentos: *');
      })

    it('Renderiza un Select para la busqueda de Temperamentos"', () => {
    
        expect(wrapper.find('select')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Tamaño *"', () => {
      expect(wrapper.find('label').at(2).text()).toEqual('Tamaño *');
    })
   
    it('Renderiza un input con la propiedad "name" igual a "height_min"', () => {
        expect(wrapper.find('input[name="height_min"]')).toHaveLength(1);
    })

    it('Renderiza un input con la propiedad "name" igual a "height_max"', () => {
        expect(wrapper.find('input[name="height_max"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Peso *"', () => {
      expect(wrapper.find('label').at(4).text()).toEqual('Peso *');
    })
   
    it('Renderiza un input con la propiedad "name" igual a "weight_min"', () => {
        expect(wrapper.find('input[name="weight_min"]')).toHaveLength(1);
    })

    it('Renderiza un input con la propiedad "name" igual a "weight_max"', () => {
        expect(wrapper.find('input[name="weight_max"]')).toHaveLength(1);
    })
    
    it('Renderiza un label con el texto igual a "Tiempo de Vida *"', () => {
      expect(wrapper.find('label').at(6).text()).toEqual('Tiempo de Vida *');
    })
   
    it('Renderiza un input con la propiedad "name" igual a "life_time_max"', () => {
        expect(wrapper.find('input[name="life_time_max"]')).toHaveLength(1);
    })

    it('Renderiza un input con la propiedad "name" igual a "life_time_min"', () => {
        expect(wrapper.find('input[name="life_time_min"]')).toHaveLength(1);
    })
    it('Renderiza un label con el texto igual a "Imagen:"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('label').at(8).text()).toEqual('Imagen:');
    })

    it('Renderiza un input con la propiedad "name" igual a "img"', () => {
      expect(wrapper.find('input[name="img"]')).toHaveLength(1);
    })
    
    it('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]').text()).toEqual('Crear Nuevo Perrito')
    })
  })
});
