import { useState } from 'react'

import './App.css'

import { 
  Button,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'

function App() {
  
  const [price,setPrice] = useState<string>('')
  const [month,setMonth] = useState<string>('')
  const [errorMonth, setErrorMonth] = useState<boolean>(true);
  const [errorPrice,setErrorPrice] = useState<boolean>(true);
  const [total,setTotal] = useState<number>(0)
  const [isCalculate,setIsCalculate] = useState<boolean>(false)

  const fnCalculate = () => {
    if(price.length > 0){
      setErrorPrice(true)
    }else{
      setErrorPrice(false)
    }
    if(month.length > 0){
      setErrorMonth(true)
    }else{
      setErrorMonth(false)
    }
    const cantidadPrice = parseInt(price)
    const plazoInt = parseInt(month)

    let totalCantidad;
    if(price.length > 0 && month.length > 0){
      setIsCalculate(true)

      if(cantidadPrice <= 1000){
        totalCantidad = cantidadPrice * 0.25;
      }else if(cantidadPrice > 1000 && cantidadPrice <= 5000){
        totalCantidad = cantidadPrice * 0.20;
      }else if(cantidadPrice > 5000 && cantidadPrice <= 10000){
        totalCantidad = cantidadPrice * 0.15;
      }else{
        totalCantidad = cantidadPrice * 0.10;
      }

      let totalPlazo = 0;

      switch(plazoInt){
        case 3:
          totalPlazo = cantidadPrice * 0.05;
          break;
        case 6:
            totalPlazo = cantidadPrice * 0.10;
          break;
        case 12:
            totalPlazo = cantidadPrice * 0.15;
          break;
        case 24:
            totalPlazo = cantidadPrice * 0.20;
          break;
        default:
            break;
      }
      setTotal(totalCantidad + totalPlazo + cantidadPrice)

    }
  }
  const data = [
    {id: 1,label: "3 meses",value: "3"},
    {id: 2,label: "6 meses",value: "6"},
    {id: 3,label: "12 meses",value: "12"},
    {id: 4,label: "24 meses",value: "24"},
  ];

  return (
    <>
        <h1 className='bg-gray-800 py-16 rounded-tr-3xl rounded-tl-3xl text-2xl text-white'>Cotizador de Prestamos</h1>
        <div className='bg-gray-500 px-10 py-20'>
          <div  className='flex justify-center gap-10 items-end mb-10'>
          <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Cantidad  de Prestamo"
          placeholder="0.00"
          className='max-w-64'
          errorMessage={errorPrice ? "" : "Escribe un precio"}
          isInvalid={errorPrice ? false : true}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
         <Select
      label="Plazo para pagar"
      className='max-w-64'
      placeholder="Seleccionar mes"
      errorMessage={errorMonth ? "" : "Selecciona un mes"}
      isInvalid={errorMonth ? false : true}
      value={month}
      name={month}
      onChange={(e) => setMonth(e.target.value)}
    >
      {data.map((item) => (
        <SelectItem textValue={item.label} key={item.value}>
          {item.value}
        </SelectItem>
      ))}
    </Select>
          </div>
          <Button 
           color='success'
           onClick={fnCalculate}
           >Calcular</Button>
        </div>
        <div className='bg-gray-800 py-16 rounded-br-3xl rounded-bl-3xl text-2xl text-white'>
        <h1 className='mb-10'>Ingrese la cantidad y el plazo</h1>
       {isCalculate && (
        <>
           <p>Cotizacion:</p>
        <p>La cantidad solicitada es: $ {price}</p>
        <p>A pagar en: $ {month}</p>
        <p>Su pago mensual es de: $ {(total / parseInt(month)).toFixed(2)}</p>
        <p>Total a pagar: $ {total.toFixed(2)}</p>
        </>
       )}
        </div>
    </>
  )
}

export default App
