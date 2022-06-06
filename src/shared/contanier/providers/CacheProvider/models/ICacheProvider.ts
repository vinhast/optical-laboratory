export default interface ICacheProvider {
  save(key: string, value: any, notClientAppId?: boolean): Promise<void>;
  recover<T>(key: string, notClientAppId?: boolean): Promise<T | null>;
  invalidate(key: string, notClientAppId?: boolean): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
  getAllKeys(): Promise<string[]>;
}
