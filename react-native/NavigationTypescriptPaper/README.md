# Dark Theme com React Navigation + Typescript + React Native Paper

Você irá aprender a como implementar temas claros e escuros e utiliza-los em todo seu aplicativo com React Native, React Navigation, React Native Paper e Typescript.

[Video do tutorial](https://youtu.be/MrY1xjURm0Y)

## Criando projeto React Native com Typescript

Para começar um projeto React Native com Typescript, basta rodar o seguinte comando. 

```tsx
npx react-native init NavigationTypescriptPaper --template react-native-template-typescript
```

[Referência da documentação](https://reactnative.dev/docs/typescript#using-custom-path-aliases-with-typescript)

## Instalando React Navigation

Para instalar o React Navigation precisamos instalar os seguintes pacotes

```tsx
yarn add @react-navigation/native react-native-screens react-native-safe-area-context
```

E dependendo do tipo de navegação que você usar, você instala apenas o pacote para aquele tipo. Para usarmos um Stack, precisamos instalar

```tsx
yarn add @react-navigation/stack
```

Caso vocês esteja usando Mac, rode o comando

```tsx
npx pod-install ios
```

E para Android, você precisa editar o arquivo `MainActivity.java` que fica em `android/app/src/main/java/<nome do projeto>/MainActivity.java` 

```java
import android.os.Bundle;
// ...

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  // ...
}
```

[Referência da documentação](https://reactnavigation.org/docs/getting-started/#installation)

## Instalando React Native Paper

Para instalar o React Native Paper precisamos instalar os seguintes pacotes

```tsx
yarn add react-native-paper react-native-vector-icons
```

[Referência da documentação](https://callstack.github.io/react-native-paper/getting-started.html#installation)

Caso você esteja usando Mac, edite sei `PodFile` e adicione o seguinte código

```
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
```

E para Android, adicione a seguinte linha no arquivo `android/app/build.gradle` 

```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

[Referência da documentação](https://github.com/oblador/react-native-vector-icons#installation)

## Criando o ThemeContext e ThemeContextProvider

Primeiro iremos importar os temas tanto do React Navigation como do React Native Paper 

```tsx
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
```

E assim iremos dar um merge nos temas, criando um tema `light` com a junção dos dois temas default e um tema `dark` com a junção dos dois temas dark.

```tsx
const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};
```

Assim teremos os dois temas definidos com os valores default dos dois pacotes e poderemos adicionar nossas próprias cores caso desejado.

Em seguida já podemos definir 2 tipos que usaremos sobre o nosso tema. O primeiro é criar um tipo que definira o nosso tema, utilizando o `typeof` do `lightTheme`, assim caso adicionemos alguma configuração a mais no nosso tema, ele é refletido para o tipo.

```tsx
export type Theme = typeof lightTheme;
```

E também definiremos os tipos de temas que teremos, que no caso será `light` e `dark`.

```tsx
export type ThemeType = 'dark' | 'light';
```

Assim já podemos definir quais dados teremos no nosso context. Passaremos o tema atual, assim como seu tipo, um booleano indicando se o tema é dark, para facilitar a comparação na hora de utilizar, uma função para alternar o valor do tema e outra para atualizar diretamente o tema caso seja necessário.

```tsx
export interface ThemeContextValue {
  theme: Theme;
  themeType: ThemeType;
  isDarkTheme: boolean;
  toggleThemeType: () => void;
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
}
```

E assim utilizaremos `React.createContext` para criar o contexto e passaremos valores default para cara propriedade.

```tsx
export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
});
```

Como vamos utilizar hooks, já podemos criar o nosso próprio hook que chamaremos de `useTheme`, simplesmente para facilitar a utilização desse contexto.

```tsx
export const useTheme = () => useContext(ThemeContext);
```

Agora iremos para a implementação do context, onde criaremos um componente `ThemeContextProvider` e a interface para suas props.

```tsx
export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
	// ...
}
```

Dentro dele utilizaremos o `useColorScheme` para saber se o celular está no modo normal ou dark mode e passaremos esse valor para um `useState` onde armazenaremos o tipo do tema.

```tsx
export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
	const colorScheme = useColorScheme();
	const [themeType, setThemeType] = useState<ThemeType>(colorScheme || 'light');
	
	// ...
}
```

Criaremos uma simples função para alternar o tipo do tema. 

```tsx
export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
	// ...

	const toggleThemeType = useCallback(() => {
	  setThemeType(prev => (prev === 'dark' ? 'light' : 'dark'));
	}, []);

	// ...
}
```

E também definiremos `isDarkTheme`  e o tema em si a ser utilizado

```tsx
export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
	// ...

	const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme],
  );

	// ...
}
```

Agora que temos todos os valores do nosso context definidos, podemos renderizar o `NavigationContainer` e o `PaperProvider` para passar o tema e também nosso provider com os valores do context.

O componente completo ficaria da seguinte forma

```tsx
export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(colorScheme || 'light');

  const toggleThemeType = useCallback(() => {
    setThemeType(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme],
  );

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <ThemeContext.Provider
          value={{
            theme,
            themeType,
            isDarkTheme,
            setThemeType,
            toggleThemeType,
          }}>
          {children}
        </ThemeContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};
```

## Utilizando o Context e alterando o tema

Em nosso `App.tsx` iremos renderizar o `ThemeContextProvider` e dentro dele utilizaremos um stack para a navegação através do `createStackNavigator`. Dentro desse stack teremos uma tela apenas para demonstrar que o tema está funcionando.

```tsx
const TestScreen = () => {
	// ...
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </ThemeContextProvider>
  );
};
```

Dentro da nossa tela de teste, podemos utilizar o custom hook que criamos `useTheme` para pegar os valores do context e utilizarmos da forma que preferirmos.

```tsx
const TestScreen = () => {
  const {toggleThemeType, themeType, isDarkTheme, theme} = useTheme();

  return (
    <View>
      <Button mode="contained" onPress={toggleThemeType}>
        Toggle Theme
      </Button>
      <Headline>{themeType}</Headline>
      <Headline>isDarkTheme: {`${isDarkTheme}`}</Headline>
      <Headline>Primary: {theme.colors.primary}</Headline>
    </View>
  );
};
```

Assim, apertando o botão podemos ver que o tema muda.

Podemos analisar também que se você colocar o celular no modo escuro, o aplicativo já inicia o tema como `dark`.