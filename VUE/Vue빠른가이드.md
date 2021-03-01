# 개요
해당 문서의 목적은 뷰를 급히 배우고 사용해야하는 사람이 기본적인 구조와 흐름을 파악할 수 있게 하는 것이다.

좀 더 자세한 튜토리얼은 [해당 링크](https://kr.vuejs.org/v2/guide/index.html)를 참고 바란다.

기본적인 html과 javascript에 대한 이해를 전제로 작성되었다.

예제는 텍스트에디터로 작성한 다음 html파일로 저장한 뒤 브라우저를 통해 확인해볼 수 있다.

# Hello Vue!
뷰의 가장 기본적인 구조는 다음과 같다.
```html
<!-- vue 로딩 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- html -->
<div id="app">
  {{ message }}
</div>
<!-- javascript -->
<script>
var app = new Vue({
  el: '#app',
  data: {
    message: '안녕하세요 Vue!'
  }
})
</script>
```
다음 예제부터는 뷰를 불러오는 코드는 생략하고 적겠다.

위 예제에서 봐야할 부분은 Vue객체를 생성하는 부분이다.

el값에 선택자를 넣어주면 해당 노드에 연결되어 객체가 가지고 있는 data값을 해당 노드에 적용시켜준다. 위 코드를 실행하면 다음과 같은 결과를 얻을 수 있다.
```text
안녕하세요 Vue!
```
Vue의 재미있는 점은 단순히 값을 치환해주고 끝이 아니라 해당 값(message)이 변경되면 Vue가 확인하고 노드에도 알아서 변경시켜준다는 것이다!

위 예제를 실행해보고 개발자 도구 콘솔에서 `app.message = "hi"` 를 실행해보자.

값이 변하는 것을 확인할 수 있다.

# 이벤트
버튼클릭과 같은 이벤트를 사용하는 법을 알아보자.
```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">메시지 뒤집기</button>
</div>
<script>
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: '안녕하세요! Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
</script>
```
`v-on`이라는 키워드를 사용해 이벤트를 등록할 수 있다.

위 예제는 click이벤트를 등록했고 뒤에 나오는 문자열은 methods에 정의된 함수의 이름이다.

클릭 이벤트가 발생하면 reverseMessage()가 실행되고 message값이 변경되면 알아서 html의 {{message}}값이 변경된다.

`v-on`에 적는 문자열은 꼭 methods에 함수일 필요는 없다. javascript로 실행되는 명령문을 적어줄 수 있다.
```html
<button v-on:click="message = message.split('').reverse().join('')">메시지 뒤집기</button>
<!-- 또는 다음과 같이 적을 수 있다. -->
<button v-on:click="reverseMessage()">메시지 뒤집기</button>
```

함수들은 파라미터를 가질 수 있으며, event객체도 받을 수 있다.
```html
<button v-on:click="say('hi')">hi라고 말하기</button>
```

`v-on`은 특별히 약어를 따로 제공해서 다음과 같이 사용할 수 있다. (v-bind의 약어도 있지만 뒤에서 언급한다.)

```html
<button @click="reverseMessage">메시지 뒤집기</button>
```

# 값 받기
html요소를 통해서 값이 변경될 수 있게 하기위해서 `v-model`이라는 키워드가 있다.

```html
<div id="app">
<input v-model="message" placeholder="여기를 수정해보세요">
<p>메시지: {{ message }}</p>
```

Vue객체의 message와 바인딩되어 input의 값을 수정하면 객체의 message값이 변하게 된다.
# 컴포넌트
vue의 구성 단위다.

사용자가 정의하는 부분이다.

```html
<ol>
  <!-- todo-item 컴포넌트의 인스턴스 만들기 -->
  <todo-item></todo-item>
</ol>

<script>
Vue.component('todo-item', {
  template: '<li>할일 항목 하나입니다.</li>'
})
</script>
```
컴포넌트를 vue에 등록하고 나면 해당 컴포넌트를 html에 요소로 사용할 수 있다.

해당 요소를 template의 요소로 대체된다.

저렇게만 사용하면 재사용성이 없기 때문에 외부값을 받아서 사용하게 되는데 이를 알아보자.

```html
<script>
Vue.component('todo-item', {
  // 이제 todo-item 컴포넌트는 "prop" 이라고 하는
  // 사용자 정의 속성 같은 것을 입력받을 수 있습니다.
  // 이 prop은 todo라는 이름으로 정의했습니다.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
</script>
```
컴포넌트에서 외부값을 받기 위해 props를 설정해주었다. 이제 외부값을 넣어보자.

```html
<ol>
  <todo-item v-bind:todo="{text:'먹기'}"></todo-item>
  <todo-item v-bind:todo="{text:'놀기'}"></todo-item>
  <todo-item v-bind:todo="{text:'자기'}"></todo-item>
</ol>
```
외부값을 넣기 위해 `v-bind`를 사용한다. ":" 뒤에는 바인드될 변수이름을 적고 문자열은 값을 적어준다.

```html
<!-- v-bind는 약어를 제공하는데 위 예제는 다음과 같인 적을 수 있다. -->
<todo-item :todo="{text:'먹기'}"></todo-item>
```

전체 코드
```html
<ol id="app">
  <todo-item v-bind:todo="{text:'먹기'}"></todo-item>
  <todo-item v-bind:todo="{text:'놀기'}"></todo-item>
  <todo-item v-bind:todo="{text:'자기'}"></todo-item>
</ol>
<script>
  Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
  })

  new Vue({
    el: '#app'
  })
</script>
```
처음에 말했듯이 Vue객체가 연결된 요소안에서만 값이 정의되기 때문에 Vue객체를 설정해줘야한다.

Vue객체를 변수에 굳이 넣어주지 않아도 된다. 당연하게도. 대신 다른 곳에서 접근이 불가능해진다. 당연하게도.

컴포넌트를 `Vue.component('todo-item', {...})` 이런 형태로 등록하면 전역으로 등록하게 된다.

특정 컴포넌트 내부에서만 사용하고 싶다면 다음과 같이 적어 줄 수 있다.

```javascript
var somewhereComponent = { /* ... */ }

var todoItemComponent = {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
  components: {
      'somewhere': somewhereComponent
  }
}

new Vue({
  el: '#app'
  components: {
    'todo-item': todoItemComponent
  }
})
```

# 제어 (if, for)

## 조건부 렌더링
요소를 특정 상태일때만 렌더링하고 싶을 때, `v-if`를 사용할 수 있다.
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
해당 요소에 연결된 vue객체의 type값이 무엇이냐에 따라 출력되는 요소가 달라진다.

## 반복
`v-for`를 통해서 요소를 반복해 렌더링 할 수 있다.
```text
Vue 2.2.0이상부터 key값이 필수입니다.
```

예제를 보자.
```html
<ul id="example-1">
  <li v-for="item in items" v-bind:key="item.id">
    {{ item.message }}
  </li>
</ul>
<script>
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { id: 0, message: 'Foo' },
      { id: 1, message: 'Bar' }
    ]
  }
})
</script>
```

Vue객체의 data에 items값이 반복가능객체이기 때문에 v-for에 사용된다.

문법은 예제와 같이 value in list 형태로 적어준다.

key값을 바인드해주지 않으면 순서에 대한 보장을 받을 수 없으며, 2.2.0버전 이후로는 필수로 바인딩해야한다.

그 외에 인덱스 값을 받아볼 수 있다.
```html
<li v-for="(item, index) in items"></li>
```
객체의 key값과 value값도 받아볼 수 있지만 생략한다.

컴포넌트와 함께 사용할 수 있다.

각 컴포넌트에 값은 v-bind를 통해 넘겨주게 된다.

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

조금 긴 예제이지만 뷰의 많은 부분을 포함하는 예제다.

몇가지 생략한 부분 아직 언급하지 않은 부분이 있지만 예제를 보도록 하자.

```html
<div id="todo-list-example">
  <!-- submit.prevent 이벤트는 event.preventDefault()가 포함된 submit이벤트를 뜻한다. == 새로고침 방지 -->
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
<script>
Vue.component('todo-item', {
//   $emit은 아직 언급하지 않은 부분으로 하위 컴포넌트가 상위컴포넌트에 데이터를 전달할 방법이 없어 이벤트를 발생시켜 이를 해결한다. $emit은 이벤트 발생 함수다.
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
</script>
```

# computed, watch
vue객체에는 computed와 watch가 있다. 둘의 사용 목적은 다르지만 작동원리가 비슷한다.

## computed
computed는 계산에 의해 나오는 상태값을 의미한다.

예를 들어보자.
- firstname과 lastname의 합친 fullname
- 객체의 갯수를 반환하는 length
- message를 뒤집은 reversedMessage

예를 든 값들은 특정값들에 의존적이며 스스로 정해지지않고 의존적인 값에 의해서 결과값이 정해진다.

이런 값들을 관리하고 최적화하기 위해서 Vue에서는 computed라는 것을 제공한다.

```html
<div id="demo">
  <p>{{ firstName }}</p>
  <p>{{ lastName }}</p>
  <p>{{ fullName }}</p>
</div>
<script>
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
</script>
```

정의된 computed의 요소들은 의존적인 값(firstName과 lastName)이 변경될때 결과값을 계산한 뒤 캐싱해두고 다른 곳에서 호출할 땐 캐싱된 값을 제공만한다.

computed요소는 일반적으로 getter만 가지지만 setter를 정의해 줄 수도 있다.

## watch
watch는 지정해둔 값이 변경되면 실행되는 함수를 등록해둔 것이다.

특정 값이 변경되면 알림을 준다던지, 추가적인 연산을 한다던지, 비동기 적인 작업이 시행돼야 한다던지 등의 작업을 하기위해 사용한다.

튜토리얼의 예제가 재미가 있어 길지만 들고왔다.

```html
<!-- 이미 Ajax 라이브러리의 풍부한 생태계와 범용 유틸리티 메소드 컬렉션이 있기 때문에, -->
<!-- Vue 코어는 다시 만들지 않아 작게 유지됩니다. -->
<!-- 이것은 이미 익숙한 것을 선택할 수 있는 자유를 줍니다. -->
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: '질문을 하기 전까지는 대답할 수 없습니다.'
  },
  watch: {
    // 질문이 변경될 때 마다 이 기능이 실행됩니다.
    question: function (newQuestion) {
      this.answer = '입력을 기다리는 중...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // _.debounce는 lodash가 제공하는 기능으로
    // 특히 시간이 많이 소요되는 작업을 실행할 수 있는 빈도를 제한합니다.
    // 이 경우, 우리는 yesno.wtf/api 에 액세스 하는 빈도를 제한하고,
    // 사용자가 ajax요청을 하기 전에 타이핑을 완전히 마칠 때까지 기다리길 바랍니다.
    // _.debounce 함수(또는 이와 유사한 _.throttle)에 대한
    // 자세한 내용을 보려면 https://lodash.com/docs#debounce 를 방문하세요.
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = '질문에는 일반적으로 물음표가 포함 됩니다. ;-)'
        return
      }
      this.answer = '생각중...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
        })
    }
  }
})
</script>
```
## 둘의 공통점과 차이
computed와 watch의 공통점은 주시하는 값이 변경되면 실행된다는 점이다. 하지만 둘은 목적성의 차이가 있기때문에 잘 선택해서 사용하길 바란다.

일반적인 경우에는 computed가 적절하다.

# 궁금한 것들과 기타 등등
전체적인 구조는 전반적으로 다루었다.

이제 다루지 못했던 궁금했던 점과 주의해야할 점에 대해서 정리해보자.

## 컴포넌트의 개인값
동일한 컴포넌트에 값을 제공하기 위해서 v-bind를 사용했다.

컴포넌트 내부코드에서는 props를 통해 그 값을 사용할 수 있었다.

처음부터 가지고 있는 값은 어떻게 할 수 있을까?

Vue객체와 같다. data를 쓰면 된다. 단! 한가지의 차이점이 있다. Vue객체는 그냥 해시맵객체를 사용하면 되지만 컴포넌트에서는 해시맵객체를 반환하는 함수를 등록해야한다.

같은 타입의 컴포넌트에서 값을 공유하는 것을 막기 위해서라고 한다.

```javascript
Vue.component('my-component', {
  template: '<span>{{ counter }}</span>',
  data: function () {
    return {
        counter: 0
    }
  }
})
```

## 다른 컴포넌트와의 통신
상위 컴포넌트는 하위 컴포넌트에게 props를 통해서 값을 전달할 수 있다.

하지만 props는 상위 컴포넌트에서만 수정이 가능하고, 하위 컴포넌트는 읽기만 가능하다.

즉 하위 컴포넌트는 상위 컴포넌트에 정보를 전달할 방법이 없다. 당연히 형제 컴포넌트나 다른 컴포넌트와도 통신할 방법이 없다.

의도된 디자인 이라고하지만 통신이 필요한 것도 사실이다.

그래서 이를 위해 $emit을 제공한다.

$emit(eventName)은 이벤트를 발생시킨다.

예제를 보고 이해해보자.
```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
<script>
Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      // increment라는 사용자 정의 이벤트를 발생시킨다.
      // 상위컴포넌트가 현재 컴포넌트에 등록해둔 이벤트다.
      this.$emit('increment')
    }
  },
})

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
</script>
```
하위 컴포넌트인 buttion-counter가 상위 컴포넌트의 total값에 영향을 줬다.

### sync
1.0버전에는 .sync 라는 수식어가 있어 하위 컴포넌트도 상위 컴포넌트가 전달해준 props값을 수정할 수 있었지만 2.0버전에는 이가 구조를 해친다고 생각해 삭제했다. 하지만 2.3이후 버전에는 다시 .sync 수식어를 추가했다.

v-on으로 확장되는 문법적 설탕이라고 한다.
```html
<!-- bar값은 하위컴포넌트에서 foo를 통해 수정가능하다. -->
<comp :foo.sync="bar"></comp>
<!-- 위 코드는 아래코드와 같다. -->
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```
### 비 부모자식간 통신
이를 위해서는 빈 Vue객체를 만들어 사용하거나 다른 상태관리 패턴을 사용해야한다. 가장 많이 사용되는 라이브러리가 Vuex다.

# 참고 자료
- 뷰 튜토리얼
    - https://kr.vuejs.org/v2/guide/index.html