import { useEffect, useRef } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

export function useUnloadFormPersistence<T extends FieldValues>(
  getValues: UseFormGetValues<T>,
  storageKey: string,
  isFormOpen: boolean,
) {
  const isUnloading = useRef(false);

  useEffect(() => {
    if (!isFormOpen) {
      sessionStorage.removeItem(storageKey);
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      try {
        const currentValues = getValues();
        sessionStorage.setItem(storageKey, JSON.stringify(currentValues));
      } catch {
        console.warn(
          '[useUnloadFormPersistence] не удалось сохранить данные формы',
        );
      }
      isUnloading.current = true;
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (!isUnloading.current) {
        sessionStorage.removeItem(storageKey);
      }
    };
  }, [getValues, storageKey, isFormOpen]);
}
