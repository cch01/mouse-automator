import { render, fireEvent } from '@testing-library/react';
import { useKeysCallbacks, Keys } from '../useKeysCallbacks'; // Adjust the import path accordingly

const TestComponent = ({
  onEnterPress,
  onEscapePress,
  onAPress,
  onArrowUpPress,
  onCtrlPress,
  onShiftPress,
  onCtrlShiftBPress,
}: {
  onEnterPress: () => void;
  onEscapePress: () => void;
  onAPress: () => void;
  onArrowUpPress: () => void;
  onCtrlPress: () => void;
  onShiftPress: () => void;
  onCtrlShiftBPress: () => void;
}) => {
  useKeysCallbacks(
    [
      { key: Keys.ENTER, callback: onEnterPress },
      { key: Keys.A, callback: onAPress },
      { key: Keys.ARROW_UP, callback: onArrowUpPress },
      { key: Keys.CONTROL, ctrl: true, callback: onCtrlPress },
      { key: Keys.SHIFT, shift: true, callback: onShiftPress },
      { key: Keys.B, ctrl: true, shift: true, callback: onCtrlShiftBPress },
      { key: Keys.ESCAPE, callback: onEscapePress },
    ]
  );

  return <div>Test Component</div>;
};

test('useKeyPress hook triggers specific callbacks on specified key presses', () => {
  const onEnterPress = vi.fn();
  const onEscapePress = vi.fn();
  const onAPress = vi.fn();
  const onArrowUpPress = vi.fn();
  const onCtrlPress = vi.fn();
  const onShiftPress = vi.fn();
  const onCtrlShiftBPress = vi.fn();

  render(
    <TestComponent
      onEscapePress={onEscapePress}
      onEnterPress={onEnterPress}
      onAPress={onAPress}
      onArrowUpPress={onArrowUpPress}
      onCtrlPress={onCtrlPress}
      onShiftPress={onShiftPress}
      onCtrlShiftBPress={onCtrlShiftBPress}
    />
  );

  // Test pressing 'Escape'
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onEscapePress).toHaveBeenCalledTimes(1);

  // Test pressing 'Enter'
  fireEvent.keyDown(document, { key: 'Enter' });
  expect(onEnterPress).toHaveBeenCalledTimes(1);

  // Test pressing 'a'
  fireEvent.keyDown(document, { key: 'a' });
  expect(onAPress).toHaveBeenCalledTimes(1);

  // Test pressing 'A' (should also trigger since it's case insensitive)
  fireEvent.keyDown(document, { key: 'A' });
  expect(onAPress).toHaveBeenCalledTimes(2);

  // Test pressing 'ArrowUp'
  fireEvent.keyDown(document, { key: 'ArrowUp' });
  expect(onArrowUpPress).toHaveBeenCalledTimes(1);

  // Test pressing 'Control' with ctrl key
  fireEvent.keyDown(document, { key: 'Control', ctrlKey: true });
  expect(onCtrlPress).toHaveBeenCalledTimes(1);

  // Test pressing 'Shift' with shift key
  fireEvent.keyDown(document, { key: 'Shift', shiftKey: true });
  expect(onShiftPress).toHaveBeenCalledTimes(1);

  // Test pressing 'b' with ctrl and shift keys
  fireEvent.keyDown(document, { key: 'b', ctrlKey: true, shiftKey: true });
  expect(onCtrlShiftBPress).toHaveBeenCalledTimes(1);

  // Test pressing a key that is not in the list (should not trigger any callback)
  fireEvent.keyDown(document, { key: 'c' });
  expect(onEnterPress).toHaveBeenCalledTimes(1);
  expect(onAPress).toHaveBeenCalledTimes(2);
  expect(onArrowUpPress).toHaveBeenCalledTimes(1);
  expect(onCtrlPress).toHaveBeenCalledTimes(1);
  expect(onShiftPress).toHaveBeenCalledTimes(1);
  expect(onCtrlShiftBPress).toHaveBeenCalledTimes(1);
});
