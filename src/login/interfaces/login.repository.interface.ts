

export interface LoginRepositoryInterface {
    /**
     * 使用者名稱查詢密碼
     * 
     * @param username 使用者名稱
     */
    findByUsername(username: string): string;
}
