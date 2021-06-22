/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import tagSeed from '../../script/seedTags'
import cocktailSeed from '../../script/seedCocktails'

let initialTags = {}
let i = 1
tagSeed.forEach(tag => {
  initialTags[i] = tag
  initialTags[i].id = i
  initialTags[i].cocktails = {}
  initialTags[i].selection = 'none'
  i++
})
i = 1
let initialCocktails = {}
cocktailSeed.forEach(cocktail => {
  initialCocktails[i] = cocktail
  initialCocktails[i].id = i
  initialCocktails[i].tags = {}
  cocktail.tagIds.forEach(id => {
    initialCocktails[i].tags[id] = id
    initialTags[id].cocktails[i] = i
  })
  i++
})

const initialState = {
  cocktails: initialCocktails,
  tags: initialTags,
  selections: { likes: [], dislikes: [], ignores: [], all: [] }
}

const LIKE = 'LIKE'
const DISLIKE = 'DISLIKE'
const IGNORE = 'IGNORE'
const RESET = 'RESET'
const ALTER_LIKE = 'ALTER_LIKE'
const ALTER_DISLIKE = 'ALTER_DISLIKE'

export const likeTag = tagId => ({
  type: LIKE,
  tagId
})
export const dislikeTag = tagId => ({
  type: DISLIKE,
  tagId
})

export const ignoreTag = tagId => ({
  type: IGNORE,
  tagId
})

export const reset = () => ({
  type: RESET
})
export const alterLike = (tagId, nextState) => ({
  type: ALTER_LIKE,
  tagId, nextState, resetCocktails: true
})
export const alterDislike = (tagId, nextState) => ({
  type: ALTER_DISLIKE,
  tagId, nextState, resetCocktails: true
})

const valid = (tags, likes, dislikes) => {
  const validLikes = likes.every(id => !!tags[id])
  const validDislikes = dislikes.every(id => !tags[id])
  return validLikes && validDislikes
}

export default (state = initialState, action) => {
  let cocktails = JSON.parse(JSON.stringify(action.resetCocktails ? initialState.cocktails : state.cocktails))
  let tags = JSON.parse(JSON.stringify(state.tags))
  let all = JSON.parse(JSON.stringify(state.selections.all))
  let likes = [...state.selections.likes]
  let dislikes = [...state.selections.dislikes]
  switch (action.type) {
    case LIKE:
      likes.push(action.tagId)
      tags[action.tagId].selection = 'likes'
      let inAllIdx = all.findIndex(tag => tag.id === action.tagId)
      if (inAllIdx > -1) all.splice(inAllIdx, 1)
      all.push(tags[action.tagId])
      Object.values(cocktails).forEach(cocktail => {
        if (!cocktail.tags[action.tagId]) {
          for (let tagId of Object.keys(cocktail.tags)) {
            delete tags[tagId].cocktails[cocktail.id]
          }
          delete cocktails[cocktail.id]
        }
      })
      return {cocktails, tags, selections: {...state.selections, likes, all}}
    case DISLIKE:
      dislikes.push(action.tagId)
      tags[action.tagId].selection = 'dislikes'
      all.push(tags[action.tagId])
      Object.values(cocktails).forEach(cocktail => {
        if (cocktail.tags[action.tagId]) {
          for (let tagId of Object.keys(cocktail.tags)) {
            delete tags[tagId].cocktails[cocktail.id]
          }
          delete cocktails[cocktail.id]
        }
      })
      return {cocktails, tags, selections: {...state.selections, dislikes, all}}
    case IGNORE:
      // ignores.push(action.tagId)
      tags[action.tagId].selection = 'ignores'
      all.push(tags[action.tagId])
      return {cocktails, tags, selections: {...state.selections, all}}
    case ALTER_LIKE:
      let likeIdx = likes.indexOf(action.tagId)
      likes.splice(likeIdx, 1)
      tags[action.tagId].selection = action.nextState
      let allIdx = all.findIndex(tag => tag.id === action.tagId)
      all.splice(allIdx, 1)
      if (action.nextState === 'dislikes') {
        dislikes.push(action.tagId)
        all.push(tags[action.tagId])
      }
      Object.values(cocktails).forEach(cocktail => {
        if (valid(cocktail.tags, likes, dislikes)) {
          cocktail.tagIds.forEach(tag => {tags[tag].cocktails[cocktail.id] = cocktail.id})
        } else {
          cocktail.tagIds.forEach(tag => {delete tags[tag].cocktails[cocktail.id]})
          delete cocktails[cocktail.id]
        }
      })
      return {tags, cocktails, selections: {likes, dislikes, all}}
    case ALTER_DISLIKE:
      let dislikeIdx = dislikes.indexOf(action.tagId)
      dislikes.splice(dislikeIdx, 1)
      let allIdx2 = all.findIndex(tag => tag.id === action.tagId)
      all.splice(allIdx2, 1)
      tags[action.tagId].selection = action.nextState
      if (action.nextState === 'likes') {
        likes.push(action.tagId)
        all.push(tags[action.tagId])
      }
      Object.values(cocktails).forEach(cocktail => {
        if (valid(cocktail.tags, likes, dislikes)) {
          cocktail.tagIds.forEach(tag => {tags[tag].cocktails[cocktail.id] = cocktail.id})
        } else {
          cocktail.tagIds.forEach(tag => {delete tags[tag].cocktails[cocktail.id]})
          delete cocktails[cocktail.id]
        }
      })
      return {tags, cocktails, selections: {likes, dislikes, all}}
    case RESET:
      return initialState
    default:
      return state
  }
}
