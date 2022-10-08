/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type { Node } from 'react';
 import { WebView } from 'react-native-webview';
 import CookieManager from '@react-native-cookies/cookies';
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 const getRandomColor = () => {
   let letters = '0123456789ABCDEF'
   let color = '#'
   for (let i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)]
   }
   return color
 }
 // const App = () => {
 //   const isDarkMode = useColorScheme() === 'dark';
 //   let webRef = React.useRef()
 //   const injectScript = `
 //   (function () {
 //     const links = document.querySelectorAll('p');
 //     links.forEach((a) => {
 //         window.console.log('what up dawg')
 //         a.addEventListener('click', (event) => {
 //           a.style.color='red'
 //           window.ReactNativeWebView.postMessage(JSON.stringify({key: a.innerHTML}));
 //         });
       
 //     })
 //   })();
 //   true;`
 //  let script = `document.body.backgroundColor='green'`
 
 //   return (
 //     <SafeAreaView style={{ flex: 1 }}>
 //       <WebView
 //       ref={webRef}
 //         injectedJavaScript={injectScript}
 //  source={{ uri: 'https://www.educative.io/' }} />
 //       {/* <Text>test hey bryan </Text> */}
 //     </SafeAreaView>
 //   );
 // };
 
 // const styles = StyleSheet.create({
 //   sectionContainer: {
 //     marginTop: 32,
 //     paddingHorizontal: 24,
 //   },
 //   sectionTitle: {
 //     fontSize: 24,
 //     fontWeight: '600',
 //   },
 //   sectionDescription: {
 //     marginTop: 8,
 //     fontSize: 18,
 //     fontWeight: '400',
 //   },
 //   highlight: {
 //     fontWeight: '700',
 //   },
 // });
 
 // export default App;
 
 
 class App extends React.Component {
   constructor(props) {
     super(props)
     this.webref = React.createRef()
   }
   componentDidMount() {
     console.log('webview', this.webref)
     // console.log('window', window.ReactNativeWebView)
     // this.webref.current.injectJavaScript(
     //   `document.querySelector('h1').style.backgroundColor = '${'red'}'`
     // )
     // window.ReactNativeWebView.postMessage(JSON.stringify({ key: 'bryan' }))
   }
   onPressWorks = (event) => {
     let test = `document.querySelector('h1')`
     console.log('test', this.webref)
     // this.webref.current.postMessage(`'bryan'`)
     // return `window.ReactNativeWebView.postMessage(JSON.stringify({ key: 'chris' }))`
     //send script to webview
     this.webref.current.postMessage(`JSON.stringify({ key: 'send to daata' })`)
     this.webref.current.injectJavaScript(
       `document.querySelectorAll('h1')[0].style.backgroundColor = '${getRandomColor()}'`
     )
   }
   handleNavigationStateChanged = (props) => {
     console.log('state changed', props) ///
     return `window.ReactNativeWebView.postMessage(JSON.stringify({key : "window changed"}))`
   }
   onMessage = (event) => {
     console.log('on message event', event.nativeEvent)
     // const data = JSON.parse(event.nativeEvent.data)
     // console.log('tesst this bitch', data.key)
   }
   render() {
     // setInterval(() => {
     //   // this.webref.current.injectJavaScript(scripts())
     //   scripts()
     // }, 3500)
     // const scripts = () => {
     //   console.log('this web', this.webref, getRandomColor())
     //   // return  `document.querySelector('body').style.backgroundColor = 'orange'`
     //   this.webref.current.injectJavaScript(
     //     `document.querySelector('body').style.backgroundColor = '${getRandomColor()}'`
     //   )
     // }
     //send to from webview to react
     const INJECTED_JAVASCRIPT = `(function() {
     window.ReactNativeWebView.postMessage(JSON.stringify({key : "bryan"}));
 })();`
     // inject on load
     const stringifiedPatchPostMessage = `
 (function () {
   const links = document.querySelectorAll('p  ');
   links.forEach((a) => {
       window.console.log('what up dawg')
       a.addEventListener('click', (event) => {
         a.style.color='red'
         window.ReactNativeWebView.postMessage(JSON.stringify({key: a.innerHTML}));
       });
       a.style.backgroundColor = '${getRandomColor()}';
     
   })
 })();
 true;`
     const query = `document.querySelector('h1').style.backgroundColor = '${getRandomColor()}'`
     const queryTwo = `window.ReactNativeWebView.postMessage(JSON.stringify({key : "bryan"})`
     return (
       <SafeAreaView style={{ flex: 1 }}>
         <WebView
           ref={this.webref}
           source={{
             uri: 'https://educative.io',
             headers: {
               Cookie:
                 'cookie1=asdf:domain=.mydomain.com:path=/;cookie2=fdsa:domain=.mydomain.com:path=/;cookie3=aaaa:domain=.mydomain.com:path=/;',
             },
           }}
           //           source={{
           //             html: `
           //           <html>
           //           <head>
           //             <meta name="viewport" content="width=device-width, initial-scale=1" />
           //           </head>
           //           <body
           //             style="
           //               display: flex;
           //               justify-content: center;
           //               flex-direction: column;
           //               align-items: center;
           //             "
           //           >
           //             <button
           //             onclick="sendDataToReactNativeApp()"
           //               style="
           //                 padding: 20;
           //                 width: 200;
           //                 font-size: 20;
           //                 color: white;
           //                 background-color: #6751ff;
           //               "
           //             >
           //               Send Data To React Native App
           //             </button>
           //             <script>
           //               const sendDataToReactNativeApp = async () => {
           //                 window.ReactNativeWebView.postMessage('Data from WebView / Website');
           //               };
           //             </script>
           //           </body>
           //         </html>
           // `,
           // }}
           injectedJavaScript={stringifiedPatchPostMessage}
           onNavigationStateChange={this.handleNavigationStateChanged}
           onMessage={this.onMessage}
         />
         {/* <Button onPress={this.onPressWorks} title={'Works'} /> */}
       </SafeAreaView>
     )
   }
 }
 export default App
 


 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const getRandomColor = () => {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';
//   let webRef = React.useRef()
//   const injectScript = `
//   (function () {
//     const links = document.querySelectorAll('p');
//     links.forEach((a) => {
//         window.console.log('what up dawg')
//         a.addEventListener('click', (event) => {
//           a.style.color='red'
//           window.ReactNativeWebView.postMessage(JSON.stringify({key: a.innerHTML}));
//         });

//     })
//   })();
//   true;`
//  let script = `document.body.backgroundColor='green'`

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <WebView
//       ref={webRef}
//         injectedJavaScript={injectScript}
//  source={{ uri: 'https://www.educative.io/' }} />
//       {/* <Text>test hey bryan </Text> */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;


const App = () => {

  let webref = React.useRef()

  const onPressWorks = (event) => {
    let test = `document.querySelector('h1')`
    console.log('test', this.webref)
    // this.webref.current.postMessage(`'bryan'`)
    // return `window.ReactNativeWebView.postMessage(JSON.stringify({ key: 'chris' }))`
    //send script to webview
    this.webref.current.postMessage(`JSON.stringify({ key: 'send to daata' })`)
    this.webref.current.injectJavaScript(
      `document.querySelectorAll('h1')[0].style.backgroundColor = '${getRandomColor()}'`
    )
  }
  const handleNavigationStateChanged = (props) => {
    console.log('state changed', props) ///
    return `window.ReactNativeWebView.postMessage(JSON.stringify({key : "window changed"}))`
  }
  const onMessage = (event) => {
    console.log('on message event', event.nativeEvent)
    // const data = JSON.parse(event.nativeEvent.data)
    // console.log('tesst this bitch', data.key)
  }
  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({key : "bryan"}));
  })();`
  // inject on load
  const stringifiedPatchPostMessage = `
  (function () {
    const links = document.querySelectorAll('p  ');
    links.forEach((a) => {
      window.console.log('what up dawg')
      a.addEventListener('click', (event) => {
        a.style.color='red'
        window.ReactNativeWebView.postMessage(JSON.stringify({key: a.innerHTML}));
      });
      a.style.backgroundColor = '${getRandomColor()}';
      
    })
  })();
  true;`
  const query = `document.querySelector('h1').style.backgroundColor = '${getRandomColor()}'`
  const queryTwo = `window.ReactNativeWebView.postMessage(JSON.stringify({key : "bryan"})`



  //send to from webview to react
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        sharedCookiesEnabled={true}
        ref={this.webref}
        source={{
          uri: 'https://educative.io',
          headers: {
            Cookie: 'cookie1=mom; cookie2=dad',
          },
        }}

        injectedJavaScript={stringifiedPatchPostMessage}
        onNavigationStateChange={this.handleNavigationStateChanged}
        onMessage={this.onMessage}
      />
      {/* <Button onPress={this.onPressWorks} title={'Works'} /> */}
    </SafeAreaView>
  )
}
export default App
