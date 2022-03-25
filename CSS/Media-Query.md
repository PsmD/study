#1

```
@media screen and (min-width: 1024px) {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 100%;
}
`;

const Cards = styled.div`
  @media screen and (min-width: 1024px) {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 25px;
	width: 60%;
}
`
```
- styled-components 안에서 Media-Query 쓰는 법