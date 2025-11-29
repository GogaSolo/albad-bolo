// storage.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly LANGUAGE_KEY = 'selectedLanguage';
  
  // BehaviorSubject ენის მდგომარეობისთვის
  private languageSubject = new BehaviorSubject<'ENG' | 'ქარ'>('ENG');
  
  // Observable რომელსაც კომპონენტები გამოიწერენ
  public languageChange: Observable<'ENG' | 'ქარ'> = this.languageSubject.asObservable();

  // ბრაუზერის შემოწმება
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // ინიციალიზაცია - localStorage-დან წავიკითხოთ შენახული ენა (მხოლოდ ბრაუზერში)
    if (this.isBrowser) {
      const savedLanguage = this.getLanguageFromStorage();
      if (savedLanguage) {
        this.languageSubject.next(savedLanguage);
      }
    }
  }

  /**
   * ენის დაყენება და შენახვა
   */
  setLanguage(language: 'ENG' | 'ქარ'): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.LANGUAGE_KEY, language);
      } catch (error) {
        console.warn('localStorage is not available:', error);
      }
    }
    this.languageSubject.next(language);
  }

  /**
   * მიმდინარე ენის მიღება
   */
  getCurrentLanguage(): 'ENG' | 'ქარ' {
    return this.languageSubject.value;
  }

  /**
   * localStorage-დან ენის წაკითხვა (მხოლოდ ბრაუზერში)
   */
  private getLanguageFromStorage(): 'ENG' | 'ქარ' | null {
    if (!this.isBrowser) {
      return null;
    }
    
    try {
      const saved = localStorage.getItem(this.LANGUAGE_KEY);
      if (saved === 'ENG' || saved === 'ქარ') {
        return saved;
      }
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
    }
    
    return null;
  }

  /**
   * localStorage-ის გასუფთავება (საჭიროების შემთხვევაში)
   */
  clearLanguage(): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(this.LANGUAGE_KEY);
      } catch (error) {
        console.warn('Error clearing localStorage:', error);
      }
    }
    this.languageSubject.next('ENG');
  }
}