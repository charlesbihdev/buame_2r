<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    public static function bootHasSlug(): void
    {
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $source = $model->{$model->getSlugSource()};
                $model->slug = static::generateUniqueSlug($source);
            }
        });
    }

    public function getSlugSource(): string
    {
        return $this->slugSource ?? 'name';
    }

    public static function generateUniqueSlug(?string $value, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($value ?: 'item');
        $slug = $baseSlug;
        $counter = 1;

        while (static::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = $baseSlug.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
