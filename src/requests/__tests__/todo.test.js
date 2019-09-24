const { getPostsId } = require('../todo')
const { expect } = require('chai')

describe('todo requests', () => {
	describe('getPostsId', ()=> {
		it('Should has one param', ()=> {
			expect(getPostsId.length).be.equal(1)
		})
	
		it('When is a valid array of posts, should return an ids string, splitted by comma', () => {
			const posts = [{ id: 1 }, { id: 2 }, { id: 3 }]
			const expected = '1, 2, 3'
	
			expect(getPostsId(posts)).be.equals(expected)
		})
	
		it('When the param is a not array should return false', () => {
			expect(getPostsId()).be.equals(false)
		})
	
		it('When the param is an array of obj but dont have id prop, should return false', () => {
			expect(getPostsId([{ userId: 1 }])).be.equal(false)
		})
	})
})
