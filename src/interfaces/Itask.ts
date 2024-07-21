export interface Itasks {
    rows?: (Itaskdata)[] | null;
    total_records: number;
  }
  export interface Itaskdata {
    id: number;
    task_name: string;
    date: string;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at?: null;
  }
  