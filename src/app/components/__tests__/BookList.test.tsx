import {
  render,
  screen,
  fireEvent,
  RenderOptions,
} from "@testing-library/react";
import { Provider } from "react-redux";
import Books from "../BookList";
import {
  addBook,
  deleteBook,
  toggleAddBookModal,
  toggleUpdateBookModal,
  setUpdateBookId,
} from "@/src/redux/slices/booksSlice";
import { AppStore, RootState, setupStore } from "@/src/redux/store";
import { PropsWithChildren } from "react";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

describe("Books component", () => {
  test("renders without crashing", () => {
    renderWithProviders(<Books />);
    expect(screen.getByText("Books")).toBeInTheDocument();
  });

  test("dispatches toggleAddBookModal action on Add Book button click", () => {
    renderWithProviders(<Books />);

    fireEvent.click(screen.getByText("Add Book"));

    expect(screen.getByRole("form")).toHaveTextContent("Add New Book");
  });

  test("dispatches toggleUpdateBookModal and setUpdateBookId actions on book item click", () => {
    renderWithProviders(<Books />);

    fireEvent.click(screen.getByText("One Hundred Years of Solitude"));

    expect(screen.getByRole("form")).toHaveTextContent("Update Book");
  });

  // Additional tests for other actions and helper functions can be added here
});
