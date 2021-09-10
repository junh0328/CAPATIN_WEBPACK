# 웹팩

## 강의 : [캡틴판교, 프론트엔드 개발자를 위한 웹팩](#https://www.inflearn.com/course/%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9%ED%8C%A9/dashboard)

## 교안 : [웹팩 핸드북](https://joshua1988.github.io/webpack-guide/)

## 깃허브 : [바로가기](https://github.com/joshua1988/LearnWebpack)

## 강의에서 다루는 내용

- 프런트엔드 빌드 시스템
  - NPM, Webpack
- 자바스크립트 모듈화 (AMD, CommonJS, ES6 Modules)
- 웹팩 개요 (등장 배경, 철학 등)
- 웹팩 주요 속성 4가지
- 배포 환경에서 알고 있어야 할 웹팩 특징과 설정 등

## 목차

- [Node.js와 NPM](#Node.js와-NPM)
- [웹팩 시작하기](#웹팩-시작하기)
- [웹팩 소개](#웹팩-소개)
- [바벨과 ES6 모듈 문법](#바벨과-ES6-모듈-문법)
- [웹팩의 주요 속성 4가지](#웹팩의-주요-속성-4가지)
- [웹팩 데브 서버](#웹팩-데브-서버)

## Node.js와 NPM

### node 버전 확인하기

```
node -v
```

### npm 패키지 초기화하기

```
npm init / npm init -y (간단히)
```

### 라이브러리 설치하기

```
npm install 라이브러리명 / yarn add

npm install axios
```

### 라이브러리 제거하기

```
npm uninstall 라이브러리 명 / yarn remove

npm uninstall axios
```

### NPM 전역으로 설치하기 (--global)

```
npm install 라이브러리명 --global / npm install 라이브러리명 -g

npm install axios --global
```

전역으로 설치할 경우, 시스템 레벨에서 확인 가능하다. 시스템 레벨에서 사용할 자바스크립트 라이브러리를 설치할 때 사용합니다.

경로 📁 /usr/local/lib/node_modules

```
cd /usr/local/lib/node_modules
open .
```

전역에 설치된 라이브러리의 경우 해당 라이브러리에서 제공하는 cli를 자유롭게 사용할 수 있다는 장점이 있다.

### NPM 지역으로 설치하기 (--save-dev)

```
npm install axios --save-prod / npm i
```

지역 설치 명령어의 경우 명령어 옵션으로 --save-prod 를 붙이지 않아도 동일한 효과가 납니다. 또한 install 대신 i를 사용해도 됩니다.

### NPM 지역 설치 옵션 2가지

지역 설치 명령어의 경우 자주 사용되는 2가지 옵션은 다음과 같습니다.

```
npm install axios --save-prod

npm install axios --save-dev
```

위 명령어는 아래와 같이 각각 축약할 수 있습니다.

```
npm i axios

npm i axios -D
```

① 설치 옵션에 아무것도 넣지 않은 npm i 는 package.json의 dependencies에 등록됩니다.

```
  "dependencies": {
    "axios": "^0.21.4"
  }
```

② 설치 옵션으로 -D를 넣은 경우에는 해당 라이브러리가 package.json의 devDependencies에 등록됩니다.

```
{
  "devDependencies": {
    "axios": "^0.21.4"
  }
}

```

### ① dependencies와 ② devDependencies의 차이점

① dependencies는 애플리케이션의 동작과 관련이 있습니다

```
  "dependencies": {
    "axios": "^0.21.4"
    "react" : "",
  }
```

② devDependencies는 개발을 할 때 도움을 주는 개발용 보조 라이브러리를 의미합니다

```
{
  "devDependencies": {
    "webpack": "",
    "":""
  }
}

```

### ① dependencies와 ② devDependencies 구분하기

설치된 배포용 라이브러리는 npm run build 로 빌드를 하면 최종 애플리케이션 코드 안에 포함됩니다.

그런데 만약 반대로 설치 옵션에 -D를 주었다면 해당 라이브러리는 빌드하고 배포할 때 애플리케이션 코드에서 빠지게 됩니다. 따라서, 최종 애플리케이션에 포함되어야 하는 라이브러리는 -D로 설치하면 안 됩니다. 개발할 때만 사용하고 배포할 때는 빠져도 좋은 라이브러리의 예시는 다음과 같습니다.

```
webpack: 빌드 도구
eslint: 코드 문법 검사 도구
imagemin: 이미지 압축 도구
```

## 웹팩 시작하기

### 웹팩이란?

웹팩이란 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)입니다. 모듈 번들러란 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미합니다.

<img src="./images/bundle.png" alt="bundle">

### 모듈이란?

모듈이란 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위를 의미합니다. 자바스크립트로 치면 아래와 같은 코드가 모듈입니다.

```js
// 📁 math.js

function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

const PI = 3.14;

export { sum, substract, PI };
```

이 math.js 파일은 아래와 같이 3가지 기능을 갖고 있는 모듈입니다.

- 두 숫자의 합을 구하는 sum() 함수
- 두 숫자의 차를 구하는 substract() 함수
- 원주율 값을 갖는 PI 상수

이처럼 성격이 비슷한 기능들을 하나의 의미있는 파일로 관리하면 모듈이 됩니다.

### 웹팩에서의 모듈

웹팩에서 지칭하는 모듈이라는 개념은 위와 같이 자바스크립트 모듈에만 국한되지 않고 웹 애플리케이션을 구성하는 모든 자원을 의미합니다. 웹 애플리케이션을 제작하려면 HTML, CSS, Javascript, Images, Font 등 많은 파일들이 필요하죠. 이 파일 하나하나가 모두 모듈입니다.

### 모듈 번들링이란?

아래 그림과 같이 웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축 해주는 동작을 모듈 번들링이라고 합니다.

파일들의 연관된 관계를 파악하여 파일들을 하나의 파일로 압축시켜주는 과정을 번들링 과정이라 합니다.

<img src="./images/moduleBundling.png" alt="moduleBundling">

## 웹팩 소개

## 바벨과 ES6 모듈 문법

## 웹팩의 주요 속성 4가지

## 웹팩 데브 서버
