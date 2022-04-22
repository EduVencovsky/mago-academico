// uso errado de label
// [ undefined, undefined, undefined ]
const result1 = [1, 2, 3].map(x => {id: x})

// retornando um objeto corretamente
// [ { id: 1 }, { id: 2 }, { id: 3 } ]
const result2 = [1, 2, 3].map(x => ({id: x}))

[1, 2, 3].map(x => { // escopo de function
    // label 
    id: x
})

loop1: for(let i = 0; i < 10; i++) {
	loop2: for(let j = 0; j < 10; j++) { 
		if(condition1) {
			break; // sai do loop2
		}
		if(condition2) {
			break loop2; // sai do loop2, igual a usar somente break
		}
		if(condition3) {
			break loop1; // sai do loop1
		}

		if(condition4) {
			continue; // continua o loop2
		}
		if(condition5) {
			continue loop2; // continua o loop2, igual a usar somente continue
		}
		if(condition6) {
			continue loop1; // continua o loop1
		}
	}
}