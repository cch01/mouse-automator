import { renderHook, fireEvent, cleanup } from "@testing-library/react";
import { useClickOutside } from "hooks/useClickOutside";

// Mock the callback function
const callback = vi.fn();

describe("useClickOutside", () => {
  afterEach(() => {
    cleanup();
    callback.mockClear();
  });

  it("should call the callback when clicking outside the target element", () => {
    // Create a div element to use as the target element
    const div = document.createElement("div");
    document.body.appendChild(div);
    const targetRef = { current: div };

    renderHook(() => useClickOutside(callback, targetRef));

    fireEvent.mouseUp(document);

    // Check that the callback was called
    expect(callback).toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it("should not call the callback when clicking inside the target element", () => {
    // Create a div element to use as the target element
    const div = document.createElement("div");
    document.body.appendChild(div);
    const targetRef = { current: div };

    renderHook(() => useClickOutside(callback, targetRef));

    fireEvent.mouseUp(div);

    // Check that the callback was not called
    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });
});
