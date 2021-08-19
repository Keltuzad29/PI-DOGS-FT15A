import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from 'react-redux';
//import {store} from '..store'
import { postDogs } from '../actions';
import configureStore from "redux-mock-store";
import  DogCreate  from './DogCreate';

// Before your test, do next setting 
const middlewares = []; // If you are not using any middleware, leave the array empty or import it and put it in
const mockStore = configureStore(middlewares); // Setting of store based on the middlewares.
const initState = {
     // Define test values of sidebarDataSlice and loginDataSlice
};
// Create the store to pass as prop in the <Provider>
const store = mockStore(initState);

configure({adapter: new Adapter()});

  describe('<DogCreate />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Provider store ={store}>
       <DogCreate />
       </Provider>);
    })
    it('deberia renderizar un "h1" que contenga el texto "Creá tu nuevo Perrito!"', () => {
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('h1').at(0).text()).toEqual('Creá tu nuevo Perrito!');
      });

    xit('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })

    xit('Renderiza un label con el texto igual a "Nombre *"', () => {
          expect(wrapper.find('label').at(0).text()).toEqual('Nombre *');
    })

    xit('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    })

    xit('Renderiza un label con el texto igual a "Selecciona al menos 3 Temperamentos: *"', () => {
         expect(wrapper.find('label').at(1).text()).toEqual('Selecciona al menos 3 Temperamentos: *');
      })

    xit('Renderiza un Select para la busqueda de Temperamentos"', () => {
    
        expect(wrapper.find('select')).toHaveLength(1);
    })

    xit('Renderiza un label con el texto igual a "Tamaño *"', () => {
      expect(wrapper.find('label').at(2).text()).toEqual('Tamaño *');
    })
   
    xit('Renderiza un input con la propiedad "name" igual a "height_min"', () => {
        expect(wrapper.find('input[name="height_min"]')).toHaveLength(1);
    })

    xit('Renderiza un input con la propiedad "name" igual a "height_max"', () => {
        expect(wrapper.find('input[name="height_max"]')).toHaveLength(1);
    })

    xit('Renderiza un label con el texto igual a "Peso *"', () => {
      expect(wrapper.find('label').at(3).text()).toEqual('Peso *');
    })
   
    xit('Renderiza un input con la propiedad "name" igual a "weight_min"', () => {
        expect(wrapper.find('input[name="weight_min"]')).toHaveLength(1);
    })

    xit('Renderiza un input con la propiedad "name" igual a "weight_max"', () => {
        expect(wrapper.find('input[name="weight_max"]')).toHaveLength(1);
    })
    
    xit('Renderiza un label con el texto igual a "Tiempo de Vida *"', () => {
      expect(wrapper.find('label').at(4).text()).toEqual('Peso *');
    })
   
    xit('Renderiza un input con la propiedad "name" igual a "life_time_max"', () => {
        expect(wrapper.find('input[name="life_time_max"]')).toHaveLength(1);
    })

    xit('Renderiza un input con la propiedad "name" igual a "life_time_min"', () => {
        expect(wrapper.find('input[name="life_time_min"]')).toHaveLength(1);
    })
    xit('Renderiza un label con el texto igual a "Imagen:"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('label').at(5).text()).toEqual('Imagen:');
    })

    xit('Renderiza un input con la propiedad "name" igual a "img"', () => {
      expect(wrapper.find('input[name="img"]')).toHaveLength(1);
    })
    
    xit('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]').text()).toEqual('Crear Nuevo Perrito').toHaveLength(1)
    })
  })
});
