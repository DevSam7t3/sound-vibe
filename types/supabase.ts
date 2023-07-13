export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      liked_songs: {
        Row: {
          created_at: string | null
          song_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          song_id?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          song_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "liked_songs_song_id_fkey"
            columns: ["song_id"]
            referencedRelation: "songs"
            referencedColumns: ["id"]
          }
        ]
      }
      songs: {
        Row: {
          author: string | null
          created_at: string | null
          id: number
          image_path: string | null
          song_path: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          id?: number
          image_path?: string | null
          song_path?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          id?: number
          image_path?: string | null
          song_path?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
