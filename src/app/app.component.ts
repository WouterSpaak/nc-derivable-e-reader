import { List, Map } from 'immutable';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Atom, atom, derivation, Derivable } from '@politie/sherlock';
import { UtilsService } from './utils.service';
import { bohemia } from './text/bohemia';
import { redHeadedLeague } from './text/red-headed-league';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

    private readonly books = { bohemia, redHeadedLeague };

    /**
     * Atoms are the basic building blocks of this reactive application. They are mutable references to immutable values.
     * Atoms represent the ground truth from which the total application state is derived.
     */
    private readonly currentBook$: Atom<List<string>> = atom(this.books.bohemia);
    readonly currentFontSize$: Atom<number> = atom(this.utils.getAvailableSizes()[0]);
    readonly currentPageNumber$: Atom<number> = atom(0);

    /**
     * Derivations are calculated derived state based on Atoms or other Derivations. They can be created by calling #derive
     * on an Atom or other derivation, or can be made with the `derivation()` function. The latter automatically registers
     * which derivable is dependant on which and updates derived state when any derivable in the state complex changes.
     */
    private readonly currentBookPaginated$ = derivation(
        () => this.utils.getPaginated(this.currentFontSize$.get(), this.currentBook$.get())
    );

    readonly currentPage$: Derivable<List<string>> = this.currentBookPaginated$.derive(list => list.get(this.currentPageNumber$.get()));

    get bookNames() {
        return Object.keys(this.books);
    }

    get availableSizes() {
        return this.utils.getAvailableSizes();
    }

    constructor(private utils: UtilsService) { }

    setBook(bookName: string) {
        this.currentBook$.set(this.books[bookName]);
    }

    setFontSize(size: number) {
        this.currentFontSize$.set(size);
    }

    setPageNumber(number: number) {
        this.currentPageNumber$.set(this.currentPageNumber$.get() + number);
    }
}
