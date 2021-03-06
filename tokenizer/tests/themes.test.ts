import Tokenizer from '../index'
import { readJSON, templates } from './paths'
// import toHTML from './toHTML'

// These tests cannot be in a separate file because of an internal lib
// that uses Object.defineProperty. If Tokenizer is imported a second time,
// calling Object.defineProperty will cause an error.

const themes = ['bimbo', 'palenight', 'nord', 'hopscotch']
const languages = ['javascript', 'css', 'html']

themes.forEach(theme => {
  languages.forEach(lang => {
    test(`${theme}-${lang}`, () => {
      const themeDefinition = readJSON(`${theme}/${theme}.json`)
      const tokenizer = new Tokenizer(themeDefinition, lang)
      const lineTokens = tokenizer.tokenizeText((templates as any)[lang])
      // console.log(toHTML(lineTokens))
      // console.log(JSON.stringify(lineTokens, null, '  '))
      expect(lineTokens).toEqual(readJSON(`${theme}/${theme}-${lang}.json`))
    })
  })
})
