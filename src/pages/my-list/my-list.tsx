import {Header} from 'src/components/header';
import {Footer} from 'src/components/footer';
import {FilmsList} from 'src/components/films-list';
import {TFilmCard} from 'src/types';


type Props = {
  films: TFilmCard[]
}

export function MyList(props: Props) {
  const {films} = props;
  return (
    <div className="user-page">
      <Header />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={films}/>
      </section>
      <Footer />
    </div>
  );
}
