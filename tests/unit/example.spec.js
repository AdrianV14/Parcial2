import { shallowMount,mount  } from '@vue/test-utils'
import Altas from '@/components/Altas.vue'

describe('Altas.vue components', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Altas)
  })

  test('Debe de hacer match con el snapshot', () => {
    const wrapper = shallowMount(Altas)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Se enseña la tabla si check:true', () => {
    const wrapper = shallowMount(Altas, {
      data(){
        return{
          check:true
        }
      }
     })
     const table = wrapper.find('table')

     expect(table.exists()).toBeTruthy()
  })

})
