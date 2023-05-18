import React, { useContext, useState } from 'react'
import { Alert } from 'react-native'

import TextRecognition from '@react-native-ml-kit/text-recognition'
import * as Location from 'expo-location'

import { SessionContext } from '../context/session'
import usePhotoPicker from './usePhotoPicker'

const useValidateOCR = () => {
  const photoPicker = usePhotoPicker()
  const [textOCR, setTextOCR] = useState('')
  const [validatingOCR, setValidatingOCR] = useState(false)
  const [image, setImage] = useState('')
  const [validateOCR, setValidateOCR] = useState(false)

  const { session } = useContext(SessionContext)

  const resetValidate = () => {
    setValidateOCR(false)
    setTextOCR('')
    setValidatingOCR(false)
    setImage('')
  }

  const getTextOCR = async () => {
    try {
      setValidatingOCR(true)
      //Abrimos la camara
      let photo = await photoPicker.takePhoto()

      //Si camara contiene foto nula
      if (photo != null) {
        const uri = photo.uri
        setImage(photo.base64)

        const result = await TextRecognition.recognize(uri)

        //Formato de placas de vehiculos en El Salvador
        const FORMATO_PLACA = /^[A-Z]{1}\s{0,2}[0-9]{1,3}\s{0,1}-{0,1}:{0,1}[A-Z0-9]{3}$/

        //Separando el texto por saltos de linea
        const resultado = result.text.split('\n')

        let placaLimpia = ''

        //Limpiando guiones del texto
        placaLimpia = resultado.map((r) => {
          return r.replace(/-/g, '')
        })
        //Limpiando espacios del texto
        placaLimpia = placaLimpia.map((r) => {
          return r.replace(/\s/g, '')
        })
        //Limpiando puntos del texto
        placaLimpia = placaLimpia.map((r) => {
          return r.replace(/\:/g, '')
        })

        placaLimpia = placaLimpia.find((item) => {
          return FORMATO_PLACA.test(item)
        })

        setTextOCR(placaLimpia)
        compareOCR(placaLimpia)

        setValidatingOCR(false)
      } else {
        setValidatingOCR(false)
        resetValidate()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const compareOCR = (placaLimpia) => {
    let placa = session.Login
    placa = placa.toUpperCase()
    if (placaLimpia == placa) {
      setValidateOCR(true)
    } else {
      setValidateOCR(false)
    }
  }

  return {
    textOCR,
    validatingOCR,
    getTextOCR,
    image,
    validateOCR,
    resetValidate
  }
}

export default useValidateOCR
