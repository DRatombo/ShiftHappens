package studentbudgetbuddy;

import java.time.LocalDate;

public class Expense {

    private Long id;
    private String userId;
    private String category;
    private double amount;
    private LocalDate date;
    private String description;

    // Constructors
    public Expense() {}

    public Expense(String userId, String category, double amount, LocalDate date, String description) {
        this.userId = userId;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}