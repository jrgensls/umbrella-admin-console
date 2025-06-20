export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      order_status_audit: {
        Row: {
          changed_at: string
          changed_by: string | null
          id: string
          new_status: Database["public"]["Enums"]["order_status_enum"]
          notes: string | null
          old_status: Database["public"]["Enums"]["order_status_enum"] | null
          order_id: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["order_status_enum"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["order_status_enum"] | null
          order_id: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["order_status_enum"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["order_status_enum"] | null
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_status_audit_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          company_address: string | null
          company_email: string
          company_name: string
          company_phone: string | null
          company_vat_number: string | null
          contact_person: string | null
          contact_title: string | null
          created_at: string
          created_by_admin: string | null
          currency: string | null
          date: string
          id: string
          notes: string | null
          order_number: string
          purchase_order_number: string | null
          reference: string | null
          status: Database["public"]["Enums"]["order_status_enum"]
          total_amount: number
          updated_at: string
          workspace_id: string
          workspace_name: string
        }
        Insert: {
          company_address?: string | null
          company_email: string
          company_name: string
          company_phone?: string | null
          company_vat_number?: string | null
          contact_person?: string | null
          contact_title?: string | null
          created_at?: string
          created_by_admin?: string | null
          currency?: string | null
          date: string
          id?: string
          notes?: string | null
          order_number: string
          purchase_order_number?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["order_status_enum"]
          total_amount: number
          updated_at?: string
          workspace_id: string
          workspace_name: string
        }
        Update: {
          company_address?: string | null
          company_email?: string
          company_name?: string
          company_phone?: string | null
          company_vat_number?: string | null
          contact_person?: string | null
          contact_title?: string | null
          created_at?: string
          created_by_admin?: string | null
          currency?: string | null
          date?: string
          id?: string
          notes?: string | null
          order_number?: string
          purchase_order_number?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["order_status_enum"]
          total_amount?: number
          updated_at?: string
          workspace_id?: string
          workspace_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          additional_contact_email: string | null
          additional_contact_name: string | null
          additional_contact_phone: string | null
          amount_paid: number | null
          billing_city: string | null
          billing_country: string | null
          billing_postal_code: string | null
          billing_street: string | null
          company_name: string
          company_size: string | null
          contact_email: string
          contact_person_name: string
          contact_phone: string
          created_at: string
          currency: string | null
          id: string
          legal_representative: boolean | null
          organization_number: string | null
          payment_status: string | null
          preferred_location: string
          start_date: string | null
          stripe_customer_id: string | null
          stripe_session_id: string
          updated_at: string
          vat_tax_number: string | null
        }
        Insert: {
          additional_contact_email?: string | null
          additional_contact_name?: string | null
          additional_contact_phone?: string | null
          amount_paid?: number | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postal_code?: string | null
          billing_street?: string | null
          company_name: string
          company_size?: string | null
          contact_email: string
          contact_person_name: string
          contact_phone: string
          created_at?: string
          currency?: string | null
          id?: string
          legal_representative?: boolean | null
          organization_number?: string | null
          payment_status?: string | null
          preferred_location: string
          start_date?: string | null
          stripe_customer_id?: string | null
          stripe_session_id: string
          updated_at?: string
          vat_tax_number?: string | null
        }
        Update: {
          additional_contact_email?: string | null
          additional_contact_name?: string | null
          additional_contact_phone?: string | null
          amount_paid?: number | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postal_code?: string | null
          billing_street?: string | null
          company_name?: string
          company_size?: string | null
          contact_email?: string
          contact_person_name?: string
          contact_phone?: string
          created_at?: string
          currency?: string | null
          id?: string
          legal_representative?: boolean | null
          organization_number?: string | null
          payment_status?: string | null
          preferred_location?: string
          start_date?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string
          updated_at?: string
          vat_tax_number?: string | null
        }
        Relationships: []
      }
      workspaces: {
        Row: {
          address: string
          contact_email: string
          created_at: string
          id: string
          name: string
          start_date: string
          updated_at: string
        }
        Insert: {
          address: string
          contact_email: string
          created_at?: string
          id?: string
          name: string
          start_date: string
          updated_at?: string
        }
        Update: {
          address?: string
          contact_email?: string
          created_at?: string
          id?: string
          name?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      order_status_enum:
        | "pending"
        | "confirmed"
        | "invoiced"
        | "cancelled"
        | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status_enum: [
        "pending",
        "confirmed",
        "invoiced",
        "cancelled",
        "refunded",
      ],
    },
  },
} as const
