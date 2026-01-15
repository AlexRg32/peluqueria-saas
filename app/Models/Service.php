<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'description',
        'duration_minutes',
        'price',
        'is_active',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
