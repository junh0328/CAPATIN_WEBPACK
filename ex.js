// map > 배열로 결과값을 반환한다.

// 가능 (배열)
const result = [1, 2, 3].map((v) => v ** 2);
console.log(result);

// 가능 (값)
[1, 2, 3].map((v) => console.log(v ** 2));

// forEach > 배열로 결과값을 반환하지 않는다.
// 따라서 forEach 함수 내부에서 결과를 따로 반환해줘야 한다

// 불가능 (배열)
const result2 = [1, 2, 3].forEach((v) => v ** 2);
console.log(result2);

// 가능 (값)
[1, 2, 3].forEach((v) => console.log(v ** 2));
